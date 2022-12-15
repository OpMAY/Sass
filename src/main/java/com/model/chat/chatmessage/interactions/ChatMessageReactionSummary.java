package com.model.chat.chatmessage.interactions;

import lombok.Data;

@Data
public class ChatMessageReactionSummary {
    private String title;
    private String emoji;
    private int count;
    private boolean active;
}
