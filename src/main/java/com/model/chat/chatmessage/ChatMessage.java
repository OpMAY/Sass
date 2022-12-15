package com.model.chat.chatmessage;

import com.model.common.Time;
import com.model.company.CompanyProfileMember;
import lombok.Data;

@Data
public class ChatMessage extends Time {
    private int no;
    private int channel_no;
    private int company_member_no;
    private int parent_message_no;
    private CHAT_MESSAGE_TYPE type;
    private String content;
    private boolean is_edit;
    private MessageContent message_json;

    private CompanyProfileMember companyProfileMember;
}
