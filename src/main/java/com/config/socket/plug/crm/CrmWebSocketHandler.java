package com.config.socket.plug.crm;

import com.google.gson.Gson;
import com.model.ws.crm.CrmSocketSessionModel;
import com.model.ws.crm.CrmWebSocketObject;
import com.util.Encryption.EncryptionService;
import com.util.Encryption.JWTEnum;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.net.URI;
import java.util.LinkedHashMap;

@Component
@Slf4j
@RequiredArgsConstructor
public class CrmWebSocketHandler extends TextWebSocketHandler {
    /**
     * TODO
     * 1. 담아둬야 할 것
     *      1) 세션
     *      2) action 프로젝트 hash
     *      3) 해당 user_no
     */
    private final EncryptionService encryptionService;
    private final LinkedHashMap<String, CrmSocketSessionModel> crmSessionQueue;

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        Gson gson = new Gson();
        String payload = message.getPayload();
        log.info("payload : {}", payload);

        log.info("session attribute keyset : {}", session.getAttributes().keySet());
        log.info("session attribute : {}", session.getAttributes().get(JWTEnum.JWTToken.name()));

        CrmWebSocketObject object = gson.fromJson(payload, CrmWebSocketObject.class);

        log.info("sessions : {}", crmSessionQueue);

        for (String sess : crmSessionQueue.keySet()) {
            if (!sess.equals(session.getId())) {
                // Sender 에겐 보내지 않음
                CrmSocketSessionModel senderModel = crmSessionQueue.get(session.getId());
                if (crmSessionQueue.get(sess).getHash().equals(senderModel.getHash())) {
                    // 같은 hash 의 프로젝트에 있는 session 에만 보냄
                    TextMessage textMessage = new TextMessage(new Gson().toJson(object));
                    crmSessionQueue.get(sess).getWebSocketSession().sendMessage(textMessage);
                }
            }
        }
    }

    /* Client가 접속 시 호출되는 메서드 */
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        URI uri = session.getUri();
        if(uri != null) {
            CrmSocketSessionModel model = new CrmSocketSessionModel();
            model.setWebSocketSession(session);
            String path = uri.getPath();
            String hash = path.substring(path.indexOf("crm/") + "crm/".length());
            log.info("hash : {}", hash);
            if(hash == null) {
                session.close(CloseStatus.SESSION_NOT_RELIABLE);
            } else {
                model.setHash(hash);
                model.setProject_no(Integer.parseInt(encryptionService.decryptAESWithSlash(hash)));
                crmSessionQueue.put(session.getId(), model);
                log.info("afterConnectionEstablished : {}", crmSessionQueue);
                log.info("{} Client Connection Established", session);
            }
        } else {
            session.close(CloseStatus.SESSION_NOT_RELIABLE);
        }
    }

    /* Client가 접속 해제 시 호출되는 메서드 */
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        log.info("{} Client Connection Closed", session);
        crmSessionQueue.remove(session.getId());
        log.info("afterConnectionClosed : {}", crmSessionQueue);
    }

    private String substringBetween(String str, String open, String close) {
        if (str == null || open == null || close == null) {
            return null;
        }
        int start = str.indexOf(open);
        if (start != -1) {
            int end = str.indexOf(close, start + open.length());
            if (end != -1) {
                return str.substring(start + open.length(), end);
            }
        }
        return null;
    }
}
