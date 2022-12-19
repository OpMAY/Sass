package com.model.chat.chatmessage.interactions;

import lombok.Data;

@Data
public class ChatMessageRead {
    private String chat_message_id;
    private int company_member_no;

    public ChatMessageRead(){

    }

    public ChatMessageRead(String chat_message_id, int company_member_no) {
        this.chat_message_id = chat_message_id;
        this.company_member_no = company_member_no;
    }
}
