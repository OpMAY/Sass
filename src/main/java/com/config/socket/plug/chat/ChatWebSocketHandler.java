package com.config.socket.plug.chat;

import com.google.gson.Gson;
import com.model.company.Company;
import com.model.ws.chat.ChatSocketSessionModel;
import com.model.ws.chat.ChatWebSocketObject;
import com.model.ws.crm.CrmSocketSessionModel;
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
public class ChatWebSocketHandler extends TextWebSocketHandler {

    private final EncryptionService encryptionService;
    private final LinkedHashMap<String, ChatSocketSessionModel> chatSessionQueue;
    private final ChatService chatService;
    private final CompanyService companyService;

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
                if (chatSessionQueue.get(session.getId()).getCompany_no() == senderModel.getCompany_no()) {
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
        chatSessionQueue.remove(session.getId());
        log.info("afterConnectionClosed : {}", chatSessionQueue);
    }
}
