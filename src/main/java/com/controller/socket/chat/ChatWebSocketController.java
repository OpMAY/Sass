package com.controller.socket.chat;

import com.model.chat.chatmessage.ChatMessage;
import com.model.ws.chat.ChatWebSocketObject;
import com.model.ws.crm.CrmWebSocketObject;
import com.service.chat.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

@MessageMapping("/socket/chat")
@Controller
@Slf4j
@RequiredArgsConstructor
public class ChatWebSocketController {
    private final ChatService chatService;

    @MessageMapping("/send")
    public void send(@Payload ChatWebSocketObject message) {
        ChatMessage chatMessage = null;
        try {
            chatMessage = (ChatMessage) message.getData();
        } catch (Exception e) {
            chatMessage = null;
            e.printStackTrace();
        }
        log.info("message : {}", message);
    }
}
