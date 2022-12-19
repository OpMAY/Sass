package com.controller.socket.chat;

import com.model.chat.chatmessage.ChatMessage;
import com.model.ws.chat.ChatWebSocketObject;
import com.service.chat.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

import javax.servlet.http.HttpServletRequest;

@MessageMapping("/socket/chat")
@Controller
@Slf4j
@RequiredArgsConstructor
public class ChatWebSocketController {
    private final ChatService chatService;

    @MessageMapping("/send")
    public void send(HttpServletRequest request, @Payload ChatWebSocketObject message) {
        ChatMessage chatMessage = null;
        try {
            chatMessage = (ChatMessage) message.getData();
        } catch (Exception e) {
            e.printStackTrace();
        }
        log.info("ChatWebSocketController message : {}", chatMessage);
    }
}
