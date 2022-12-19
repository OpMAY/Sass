package com.config.socket.plug.chat;

import com.google.gson.Gson;
import com.model.chat.chatmessage.ChatMessage;
import com.model.company.Company;
import com.model.company.CompanyMember;
import com.model.ws.chat.CHAT_ACTION_TYPE;
import com.model.ws.chat.ChatChannelSocketSessionModel;
import com.model.ws.chat.ChatSocketSessionModel;
import com.model.ws.chat.ChatWebSocketObject;
import com.service.CompanyService;
import com.service.chat.ChatService;
import com.util.Encryption.EncryptionService;
import com.util.Encryption.JWTEnum;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.LinkedHashMap;

@Component
@Slf4j
@RequiredArgsConstructor
public class ChatChannelWebSocketHandler extends TextWebSocketHandler {
    private final LinkedHashMap<String, ChatSocketSessionModel> chatSessionQueue;
    private final LinkedHashMap<String, ChatChannelSocketSessionModel> chatChannelSessionQueue;
    private final ChatService chatService;
    private final CompanyService companyService;
    private final EncryptionService encryptionService;

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        Gson gson = new Gson();
        String payload = message.getPayload();
        boolean pass = false;
        log.info("chatWebSocketHandler payload : {}", payload);
        ChatWebSocketObject object = gson.fromJson(payload, ChatWebSocketObject.class);
        ChatMessage chatMessage = null;
        HashMap<String, Object> hashMap = new EncryptionService().decryptJWT(session.getAttributes().get(JWTEnum.JWTToken.name()).toString());
        Integer user_no = (Integer) hashMap.get(JWTEnum.NO.name());
        Company company = companyService.getUserCompany(user_no);
        CompanyMember companyMember = companyService.getUserCompanyMemberInfo(user_no, company.getNo());
        switch (object.getAction_type()) {
            case SEND_MESSAGE:
                try {
                    chatMessage = (ChatMessage) object.getData();
                } catch (Exception e) {
                    e.printStackTrace();
                }
                if (chatMessage != null) {
                    chatMessage.setCompany_member_no(companyMember.getNo());
                    chatMessage = chatService.sendMessage(chatMessage);
                    object.setData(chatMessage);
                    pass = true;
                }
                log.info("chatMessage : {}", chatMessage);
                break;
            case TYPING:
            case TYPE_END:
            case REACTION:
            default:
                break;
        }

        log.info("sessions : {}", chatSessionQueue);

        if (pass) {
            // TODO ACTION_TYPE 별 Send 기준 잡기
            for (String sess : chatSessionQueue.keySet()) {
                if (!sess.equals(session.getId())) {
                    // Sender 에겐 보내지 않음
                    ChatSocketSessionModel senderModel = chatSessionQueue.get(session.getId());
                    if (chatSessionQueue.get(session.getId()).getCompany_no() == senderModel.getCompany_no()) {
                        // 같은 회사의 ChatPlug 수신 채널에만 전송
                        ChatChannelSocketSessionModel channelSenderModel = chatChannelSessionQueue.get(session.getId());
                        /**
                         * ChatMessage의 경우
                         * 1. ChatSession, chatChannelSession 모두에 있으면 chatChannelSessionQueue 기준으로 전송
                         * 2. ChatSession 에만 있으면 chatSessionQueue 기준 채널로 전송
                         * 그 외 (메세지 리액션, 메세지 입력 중, 메세지 입력 중 end 등의 interaction)
                         * -> chatChannelSession 에만 전송
                         * */
                        TextMessage textMessage = new TextMessage(new Gson().toJson(object));
                        if (object.getAction_type().equals(CHAT_ACTION_TYPE.SEND_MESSAGE)) {
                            if (channelSenderModel != null) {
                                // case 1
                                if (chatChannelSessionQueue.get(session.getId()).getChannel_no() == channelSenderModel.getChannel_no()) {
                                    // 같은 채널에 있는 session에만 전송
                                    chatChannelSessionQueue.get(sess).getWebSocketSession().sendMessage(textMessage);
                                    // TODO READ 처리
                                }
                            } else {
                                // case 2
                                chatSessionQueue.get(sess).getWebSocketSession().sendMessage(textMessage);
                            }
                        } else {
                            if (chatChannelSessionQueue.get(session.getId()).getChannel_no() == channelSenderModel.getChannel_no()) {
                                // 같은 채널에 있는 session에만 전송
                                chatChannelSessionQueue.get(sess).getWebSocketSession().sendMessage(textMessage);
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
            if (chatSessionQueue.get(session.getId()) != null) {
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
                        ChatChannelSocketSessionModel model = new ChatChannelSocketSessionModel();
                        model.setHash(hash);
                        model.setChannel_no(channel_no);
                        model.setWebSocketSession(session);
                        model.setUser_no(user_no);
                        model.setReg_datetime(LocalDateTime.now());
                        model.setExpired_datetime(LocalDateTime.now().plusDays(1));
                        log.info("model : {}", model);
                        chatChannelSessionQueue.put(session.getId(), model);
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
            } else {
                // 메인 WebSocket을 먼저 연결하지 않았을 때
                session.close(CloseStatus.SESSION_NOT_RELIABLE);
                log.info("afterConnectionEstablished SessionClose : session must connect chatWebsocketHandler First");
            }
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
