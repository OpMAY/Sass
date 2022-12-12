package com.model.chat.chatmessage.interactions;

import com.model.common.Time;
import lombok.Data;

@Data
public class ChatMessageReaction extends Time {
    private int no;
    private int chat_message_no;
    private int company_member_no;
    private String reaction;
}
