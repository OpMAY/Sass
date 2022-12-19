package com.model.chat.chatmessage.interactions;

import com.model.common.Time;
import lombok.Data;

@Data
public class ChatMessageSave extends Time {
    private int no;
    private String chat_message_id;
    private int company_member_no;

    public ChatMessageSave() {

    }

    public ChatMessageSave(String chat_message_id, int company_member_no) {
        this.chat_message_id = chat_message_id;
        this.company_member_no = company_member_no;
    }
}
