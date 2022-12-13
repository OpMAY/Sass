package com.config.socket.plug.chat;

import com.model.ws.chat.ChatSocketSessionModel;
import com.service.chat.ChatService;
import com.util.Encryption.EncryptionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

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

    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {

    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {

    }
}
