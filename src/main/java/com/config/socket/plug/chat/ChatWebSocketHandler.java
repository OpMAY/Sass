package com.config.socket.plug.chat;

import com.google.gson.Gson;
import com.model.ws.chat.ChatSocketSessionModel;
import com.model.ws.chat.ChatWebSocketObject;
import com.model.ws.crm.CrmSocketSessionModel;
import com.service.chat.ChatService;
import com.util.Encryption.EncryptionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.net.URI;
import java.util.LinkedHashMap;

@Component
@Slf4j
@RequiredArgsConstructor
public class ChatWebSocketHandler extends TextWebSocketHandler {

    private final EncryptionService encryptionService;
    private final LinkedHashMap<String, ChatSocketSessionModel> chatSessionQueue;
    private final ChatService chatService;

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
                if (chatSessionQueue.get(sess).getHash().equals(senderModel.getHash())) {
                    // 같은 hash 의 프로젝트에 있는 session 에만 보냄
                    TextMessage textMessage = new TextMessage(new Gson().toJson(object));
                    chatSessionQueue.get(sess).getWebSocketSession().sendMessage(textMessage);
                }
            }
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        URI uri = session.getUri();
        if(uri != null) {
            ChatSocketSessionModel model = new ChatSocketSessionModel();
            model.setWebSocketSession(session);
            String path = uri.getPath();
            String hash = path.substring(path.indexOf("crm/") + "crm/".length());
            log.info("hash : {}", hash);
            if(hash == null) {
                session.close(CloseStatus.SESSION_NOT_RELIABLE);
            } else {
                model.setHash(hash);
                model.setChannel_no(Integer.parseInt(encryptionService.decryptAESWithSlash(hash)));
                chatSessionQueue.put(session.getId(), model);
                log.info("afterConnectionEstablished : {}", chatSessionQueue);
                log.info("{} Client Connection Established", session);
            }
        } else {
            session.close(CloseStatus.SESSION_NOT_RELIABLE);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        log.info("{} Client Connection Closed", session);
        chatSessionQueue.remove(session.getId());
        log.info("afterConnectionClosed : {}", chatSessionQueue);
    }
}
