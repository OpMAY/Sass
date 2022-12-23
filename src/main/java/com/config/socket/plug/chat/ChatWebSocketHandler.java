package com.config.socket.plug.chat;

import com.dao.CompanyMemberDao;
import com.google.gson.Gson;
import com.model.company.Company;
import com.model.company.CompanyMember;
import com.model.grant.PLUGIN_TYPE;
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

import java.net.URI;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.LinkedHashMap;

@Component
@Slf4j
@RequiredArgsConstructor
public class ChatWebSocketHandler extends TextWebSocketHandler {

    private final EncryptionService encryptionService;
    private final LinkedHashMap<String, ChatSocketSessionModel> chatSessionQueue;
    private final ChatService chatService;
    private final CompanyService companyService;
    private final CompanyMemberDao companyMemberDao;
    private final LinkedHashMap<String, ChatChannelSocketSessionModel> chatChannelSessionQueue;

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        Gson gson = new Gson();
        String payload = message.getPayload();
        log.info("chatWebSocketHandler payload : {}", payload);
        ChatWebSocketObject object = gson.fromJson(payload, ChatWebSocketObject.class);

        log.info("sessions : {}", chatSessionQueue);

        for (String sess : chatSessionQueue.keySet()) {
            if (!sess.equals(session.getId())) {
                // Sender 에겐 보내지 않음
                ChatSocketSessionModel senderModel = chatSessionQueue.get(session.getId());
                if (chatSessionQueue.get(sess).getCompany_no() == senderModel.getCompany_no()) {
                    // 같은 회사의 ChatPlug 수신 채널에만 전송
                    TextMessage textMessage = new TextMessage(new Gson().toJson(object));
                    chatSessionQueue.get(sess).getWebSocketSession().sendMessage(textMessage);
                }
            }
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        URI uri = session.getUri();
        if (uri != null) {
            Integer user_no = null;
            log.info("jwt session : {}", session.getAttributes().get(JWTEnum.JWTToken.name()));
            try {
                HashMap<String, Object> hashMap = new EncryptionService().decryptJWT(session.getAttributes().get(JWTEnum.JWTToken.name()).toString());
                user_no = (Integer) hashMap.get(JWTEnum.NO.name());
            } catch (Exception e) {
                e.printStackTrace();
                session.close(CloseStatus.SESSION_NOT_RELIABLE);
                log.info("afterConnectionEstablished SessionClose : try Catch");
            }
            if (user_no != null && companyService.checkUserHasCompany(user_no)) {
                // 접속 유저가 올바른 회사 정보에 접속했는지 파악 후 해당 정보 queue 삽입
                Company company = companyService.getUserCompany(user_no);
                CompanyMember companyMember = companyMemberDao.getUserMemberInfoByUserNo(user_no);
                ChatSocketSessionModel model = new ChatSocketSessionModel();
                model.setHash(encryptionService.encryptAES(Integer.toString(company.getNo()), true));
                model.setCompany_no(company.getNo());
                model.setWebSocketSession(session);
                model.setUser_no(user_no);
                model.setReg_datetime(LocalDateTime.now());
                model.setExpired_datetime(LocalDateTime.now().plusDays(1));
                log.info("model : {}", model);
                chatSessionQueue.put(session.getId(), model);
                log.info("afterConnectionEstablished : {}", chatSessionQueue);
                log.info("{} Client Connection Established", session);
                // 큐에 있는 유저에게 접속 유저가 ONLINE 임을 알림
                ChatWebSocketObject object = new ChatWebSocketObject();
                object.setPlugin_type(PLUGIN_TYPE.CHAT);
                object.setUser_no(user_no);
                object.setAction_type(CHAT_ACTION_TYPE.UPDATE);
                ChatWebSocketDataObject dataModel = new ChatWebSocketDataObject();
                dataModel.setCategory(CHAT_CATEGORY.WORKSPACE);
                dataModel.setSubcategory(CHAT_SUBCATEGORY.SIDE);
                dataModel.setThirdcategory(CHAT_THIRDCATEGORY.DIRECT);
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("id", encryptionService.encryptAES(Integer.toString(companyMember.getNo()), true));
                jsonObject.put("is_live", true);
                dataModel.setData(jsonObject);
                for (String sess : chatSessionQueue.keySet()) {
                    if (!sess.equals(session.getId())) {
                        // Sender 에겐 보내지 않음
                        ChatSocketSessionModel senderModel = chatSessionQueue.get(session.getId());
                        if (chatSessionQueue.get(session.getId()).getCompany_no() == senderModel.getCompany_no()) {
                            // 같은 회사의 ChatPlug 수신 채널에만 전송
                            if (IsSessionUserListeningChannel(sess)) {
                                dataModel.setCategory(CHAT_CATEGORY.CHAT);
                                dataModel.setSubcategory(CHAT_SUBCATEGORY.CHANNEL);
                                dataModel.setThirdcategory(CHAT_THIRDCATEGORY.DIRECT);
                                dataModel.setTarget(CHAT_TARGET.LIVE);
                            }
                            object.setData(dataModel);
                            TextMessage textMessage = new TextMessage(new Gson().toJson(object));
                            chatSessionQueue.get(sess).getWebSocketSession().sendMessage(textMessage);
                        }
                    }
                }
            } else {
                session.close(CloseStatus.SESSION_NOT_RELIABLE);
                log.info("afterConnectionEstablished SessionClose : user_no null or user no company : {}", user_no);
            }
        } else {
            session.close(CloseStatus.SESSION_NOT_RELIABLE);
            log.info("afterConnectionEstablished SessionClose : no uri");
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        log.info("{} Client Connection Closed", session);
        log.info("jwt session : {}", session.getAttributes().get(JWTEnum.JWTToken.name()));
        HashMap<String, Object> hashMap = new EncryptionService().decryptJWT(session.getAttributes().get(JWTEnum.JWTToken.name()).toString());
        Integer user_no = (Integer) hashMap.get(JWTEnum.NO.name());
        // 큐에 있는 유저에게 접속 유저가 OFFLINE 임을 알림
        ChatWebSocketObject object = new ChatWebSocketObject();
        object.setPlugin_type(PLUGIN_TYPE.CHAT);
        object.setUser_no(user_no);
        object.setAction_type(CHAT_ACTION_TYPE.UPDATE);
        ChatWebSocketDataObject dataModel = new ChatWebSocketDataObject();
        dataModel.setCategory(CHAT_CATEGORY.WORKSPACE);
        dataModel.setSubcategory(CHAT_SUBCATEGORY.SIDE);
        dataModel.setThirdcategory(CHAT_THIRDCATEGORY.DIRECT);
        dataModel.setTarget(CHAT_TARGET.LIVE);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("id", encryptionService.encryptAES(Integer.toString(companyMemberDao.getUserMemberInfoByUserNo(user_no).getNo()), true));
        jsonObject.put("is_live", false);
        dataModel.setData(jsonObject);
        for (String sess : chatSessionQueue.keySet()) {
            if (!sess.equals(session.getId())) {
                // Sender 에겐 보내지 않음
                ChatSocketSessionModel senderModel = chatSessionQueue.get(session.getId());
                if (chatSessionQueue.get(session.getId()).getCompany_no() == senderModel.getCompany_no()) {
                    // 같은 회사의 ChatPlug 수신 채널에만 전송
                    if (IsSessionUserListeningChannel(sess)) {
                        dataModel.setCategory(CHAT_CATEGORY.CHAT);
                        dataModel.setSubcategory(CHAT_SUBCATEGORY.CHANNEL);
                        dataModel.setThirdcategory(CHAT_THIRDCATEGORY.DIRECT);
                        dataModel.setTarget(CHAT_TARGET.LIVE);
                    }
                    object.setData(dataModel);
                    TextMessage textMessage = new TextMessage(new Gson().toJson(object));
                    chatSessionQueue.get(sess).getWebSocketSession().sendMessage(textMessage);
                }
            }
        }
        chatSessionQueue.remove(session.getId());
        log.info("afterConnectionClosed : {}", chatSessionQueue);
    }

    private boolean IsSessionUserListeningChannel(String session_id) {
        return chatChannelSessionQueue.containsKey(session_id);
    }
}
