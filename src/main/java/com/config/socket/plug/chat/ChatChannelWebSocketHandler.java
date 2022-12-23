package com.config.socket.plug.chat;

import com.dao.chat.ChatMessageDao;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.stream.JsonReader;
import com.model.chat.chatmessage.ChatMessage;
import com.model.chat.chatmessage.interactions.ChatMessageReaction;
import com.model.company.Company;
import com.model.company.CompanyMember;
import com.model.ws.chat.*;
import com.service.CompanyService;
import com.service.chat.ChatService;
import com.util.Encryption.EncryptionService;
import com.util.Encryption.JWTEnum;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.StringReader;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@Component
@Slf4j
@RequiredArgsConstructor
public class ChatChannelWebSocketHandler extends TextWebSocketHandler {
    private final LinkedHashMap<String, ChatSocketSessionModel> chatSessionQueue;
    private final LinkedHashMap<String, ChatChannelSocketSessionModel> chatChannelSessionQueue;
    private final ChatService chatService;
    private final CompanyService companyService;
    private final EncryptionService encryptionService;
    private final ChatMessageDao chatMessageDao;

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        Gson gson = new Gson();
        String payload = message.getPayload();
        log.info("chatWebSocketHandler payload : {}", payload);
        ChatWebSocketObject object = gson.fromJson(payload, ChatWebSocketObject.class);


        log.info("sessions : {}", chatSessionQueue);

        /**
         * ChatWebSocketHandler 와 ChatChannelWebSocketHandler 를 각각 연결하게 되면 session_id 가 다름
         * */

        ChatSocketSessionModel senderSocketModel = null;
        ChatChannelSocketSessionModel senderModel = chatChannelSessionQueue.get(session.getId());
        for (String socketSess : chatSessionQueue.keySet()) {
            if (chatSessionQueue.get(socketSess).getUser_no() == senderModel.getUser_no()) {
                senderSocketModel = chatSessionQueue.get(socketSess);
                break;
            }
        }


        // TODO ACTION_TYPE 별 Send 기준 잡기
        // Session 정보를 올바르게 찾았다면 전송
        if (senderSocketModel != null && senderSocketModel.getUser_no() == senderModel.getUser_no()) {
            for (String sess : chatChannelSessionQueue.keySet()) {
                // Sender 에겐 보내지 않음
                if (!sess.equals(session.getId())) {
                    // 우선 채팅 채널 소켓 목록으로부터 common chat에 연결되어 있는 정보까지 가져옴
                    ChatSocketSessionModel receiverSocketModel = null;
                    ChatChannelSocketSessionModel receiverModel = chatChannelSessionQueue.get(sess);
                    for (String socketSess : chatSessionQueue.keySet()) {
                        if (chatSessionQueue.get(socketSess).getUser_no() == receiverModel.getUser_no()) {
                            receiverSocketModel = chatSessionQueue.get(socketSess);
                            break;
                        }
                    }
                    /**
                     * ChatMessage의 경우
                     * 1. ChatSession, chatChannelSession 모두에 있으면 chatChannelSessionQueue 기준으로 전송
                     * 2. ChatSession 에만 있으면 chatSessionQueue 기준 채널로 전송
                     * 그 외 (메세지 리액션, 메세지 입력 중, 메세지 입력 중 end 등의 interaction)
                     * -> chatChannelSession 에만 전송
                     * */
                    TextMessage textMessage = new TextMessage(new Gson().toJson(object));
                    if (receiverSocketModel != null) {
                        // 수신자가 chat common server 에 있는지 먼저 검증
                        ArrayList<Integer> receiver_channels = receiverModel.getChannels();
                        if (object.getAction_type().equals(CHAT_ACTION_TYPE.CREATE)) {
                            if (object.getData().getCategory().equals(CHAT_CATEGORY.CHAT)) {
                                if (object.getData().getSubcategory().equals(CHAT_SUBCATEGORY.MAIN)) {
                                    if (object.getData().getThirdcategory().equals(CHAT_THIRDCATEGORY.MESSAGE)) {
                                        ChatMessage chatMessage;
                                        if (object.getData().getTarget() != null) {
                                            // 메세지 이모지 추가 or 북마크
                                            ChatMessageReaction reaction = (ChatMessageReaction) object.getData().getData();
                                            chatMessage = chatMessageDao.getChatMessageById(reaction.getChat_message_id());
                                        } else {
                                            Map<String, Object> objectMap = (Map<String, Object>) object.getData().getData();
                                            String id = objectMap.get("id").toString();
                                            chatMessage = chatService.getChatMessageById(id);
                                        }
                                        if (receiver_channels.contains(chatMessage.getChannel_no())) {
                                            chatChannelSessionQueue.get(sess).getWebSocketSession().sendMessage(textMessage);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        URI uri = session.getUri();
        if (uri != null) {
//            if (chatSessionQueue.get(session.getId()) != null) {
            Integer user_no = null;
            log.info("jwt session : {}", session.getAttributes().get(JWTEnum.JWTToken.name()));
            try {
                HashMap<String, Object> hashMap = new EncryptionService().decryptJWT(session.getAttributes().get(JWTEnum.JWTToken.name()).toString());
                user_no = (Integer) hashMap.get(JWTEnum.NO.name());
            } catch (Exception e) {
                e.printStackTrace();
                log.info("user_no on jwt session might be null : {}", user_no);
            }
            if (user_no != null && companyService.checkUserHasCompany(user_no)) {
                // 접속 유저가 올바른 회사 정보에 접속했는지 파악 후 해당 정보 queue 삽입
                // TODO exception 예상 예외처리 : hash substring, channel_no parse
                Company company = companyService.getUserCompany(user_no);
                String path = uri.getPath();
                String hash = path.substring(path.indexOf("chat/") + "chat/".length());
                int channel_no = Integer.parseInt(encryptionService.decryptAESWithSlash(hash));
                if (chatService.checkChannelBelongToCompany(channel_no, company.getNo())) {
                    if (chatChannelSessionQueue.containsKey(session.getId())) {
                        // 기존 세션에 채널 추가
                        ChatChannelSocketSessionModel model = chatChannelSessionQueue.get(session.getId());
                        ArrayList<Integer> channels = model.getChannels();
                        if (!channels.contains(channel_no)) {
                            channels.add(channel_no);
                        }
                        model.setChannels(channels);
                        chatChannelSessionQueue.replace(session.getId(), model);
                    } else {
                        // 세션 추가
                        ChatChannelSocketSessionModel model = new ChatChannelSocketSessionModel();
                        ArrayList<Integer> channels = new ArrayList<>();
                        model.setHash(hash);
                        channels.add(channel_no);
                        model.setChannels(channels);
                        model.setWebSocketSession(session);
                        model.setUser_no(user_no);
                        model.setReg_datetime(LocalDateTime.now());
                        model.setExpired_datetime(LocalDateTime.now().plusDays(1));
                        log.info("model : {}", model);
                        chatChannelSessionQueue.put(session.getId(), model);
                    }
                    log.info("afterConnectionEstablished : {}", chatChannelSessionQueue);
                    log.info("{} Client Connection Established", session);
                } else {
                    // session의 유저 정보와 channel과 연동되어있지 않을 때
                    session.close(CloseStatus.SESSION_NOT_RELIABLE);
                    log.info("afterConnectionEstablished SessionClose : company <-> channel not match : {}, {}", company.getNo(), channel_no);
                }
            } else {
                // user_no 나 유저와 엮여져있는 company 가 없을 때 => 동기화 오류 및 악의적 접근
                session.close(CloseStatus.SESSION_NOT_RELIABLE);
                log.info("afterConnectionEstablished SessionClose : user_no null or user no company : {}", user_no);
            }
//            } else {
//                // 메인 WebSocket을 먼저 연결하지 않았을 때
//                session.close(CloseStatus.SESSION_NOT_RELIABLE);
//                log.info("afterConnectionEstablished SessionClose : session must connect chatWebsocketHandler First");
//            }
        } else {
            // 잘못된 요청
            session.close(CloseStatus.SESSION_NOT_RELIABLE);
            log.info("afterConnectionEstablished SessionClose : no uri");
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        log.info("{} Client Connection Closed", session);
        chatChannelSessionQueue.remove(session.getId());
        log.info("afterConnectionClosed : {}", chatChannelSessionQueue);
    }
}
