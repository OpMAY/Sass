package com.config.socket.plug.crm;

import com.google.gson.Gson;
import com.model.ws.crm.CrmSocketSessionModel;
import com.model.ws.crm.CrmWebSocketObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.LinkedHashMap;

@Component
@Slf4j
public class CrmWebSocketHandler extends TextWebSocketHandler {
    /**
     * TODO
     * 1. 담아둬야 할 것
     *      1) 세션
     *      2) action 프로젝트 hash
     *      3) 해당 user_no
     */
    private LinkedHashMap<String, CrmSocketSessionModel> sessions;

    @PostConstruct
    private void init() {
        log.info("crmwebsocketHandler postconstructor");
        sessions = new LinkedHashMap<>();
        log.info("sessions : {}", sessions);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        Gson gson = new Gson();
        String payload = message.getPayload();
        log.info("payload : {}", payload);

        CrmWebSocketObject object = gson.fromJson(payload, CrmWebSocketObject.class);

        for (String sess : sessions.keySet()) {
            TextMessage textMessage = new TextMessage(new Gson().toJson(object));
            sessions.get(sess).getWebSocketSession().sendMessage(textMessage);
        }
    }

    /* Client가 접속 시 호출되는 메서드 */
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        CrmSocketSessionModel model = new CrmSocketSessionModel();
        model.setWebSocketSession(session);
        log.info("session : {}, sessions : {}", session, sessions);
        sessions.put(session.getId(), model);
        log.info("{} Client Connection Established", session);
    }

    /* Client가 접속 해제 시 호출되는 메서드드 */
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        log.info("{} Client Connection Closed", session);
        sessions.remove(session.getId());
    }
}
