package com.model.ws;

import lombok.Data;
import org.springframework.web.socket.WebSocketSession;

import java.time.LocalDateTime;

@Data
public class SocketSessionModel {
    private WebSocketSession webSocketSession;
    private int user_no;
    private LocalDateTime reg_datetime;
    private LocalDateTime expired_datetime;
}
