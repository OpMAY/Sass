package com.model.chat.chatmessage.interactions;

import com.model.common.Time;
import lombok.Data;

@Data
public class ChatMessageReaction extends Time {
    private int no;
    private String chat_message_id;
    private int company_member_no;
    private String reaction;
}
