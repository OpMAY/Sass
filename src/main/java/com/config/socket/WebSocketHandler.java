package com.config.socket;

import com.google.gson.Gson;
import com.model.ws.SocketSessionModel;
import com.model.ws.WebSocketSimpleObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;

@Component
@Slf4j
public class WebSocketHandler extends TextWebSocketHandler {
    private LinkedHashMap<String, SocketSessionModel> sessions;

    @PostConstruct
    private void init() {
        sessions = new LinkedHashMap<>();
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        Gson gson = new Gson();
        String payload = message.getPayload();
        log.info("payload : {}", payload);

        WebSocketSimpleObject object = gson.fromJson(payload, WebSocketSimpleObject.class);

        for (String sess : sessions.keySet()) {
            TextMessage textMessage = new TextMessage(gson.toJson(object));
            sessions.get(sess).getWebSocketSession().sendMessage(textMessage);
        }
    }

    /* Client가 접속 시 호출되는 메서드 */
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        SocketSessionModel socketSessionModel = new SocketSessionModel();
        socketSessionModel.setWebSocketSession(session);
        // TODO get user info from HttpServletRequest
//        socketSessionModel.setUser_no();
        socketSessionModel.setReg_datetime(LocalDateTime.now());
        // TODO set expired date
//        socketSessionModel.setExpired_datetime(LocalDateTime.now());
        sessions.put(session.getId(), socketSessionModel);
        log.info("{} Client Connection Established", session);
    }

    /* Client가 접속 해제 시 호출되는 메서드드 */
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        log.info("{} Client Connection Closed", session);
        sessions.remove(session.getId());
    }

    private void handleWebSocketSessionExpire() {
        for (SocketSessionModel socketSessionModel : sessions.values()) {
            if (socketSessionModel.getExpired_datetime().isBefore(LocalDateTime.now())) {
                sessions.remove(socketSessionModel.getWebSocketSession().getId());
            }
        }
    }
}
