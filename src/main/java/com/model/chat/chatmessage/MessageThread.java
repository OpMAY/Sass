package com.model.chat.chatmessage;

import lombok.Data;

import java.util.ArrayList;

@Data
public class MessageThread {
    private ChatMessage message;
    private ArrayList<ChatMessage> messages;
}
