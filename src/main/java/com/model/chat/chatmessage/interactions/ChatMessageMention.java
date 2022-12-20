package com.model.chat.chatmessage.interactions;

import lombok.Data;

@Data
public class ChatMessageMention {
    private int no;
    private String chat_message_id;
    private int company_member_no;

    private boolean is_active;
    private String member_hash;
}
