package com.model.chat.chatmessage;

import com.model.chat.chatmessage.interactions.ChatMessageReaction;
import com.model.chat.chatmessage.interactions.ChatMessageReactionSummary;
import com.model.common.MFile;
import com.model.common.Time;
import com.model.company.CompanyProfileMember;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Data
public class ChatMessage extends Time {
    private String id;
    private int channel_no;
    private int company_member_no;
    private String parent_message_id;
    private CHAT_MESSAGE_TYPE type;
    private String content;
    private boolean edited;
    private MessageContent message_json;

    private CompanyProfileMember companyProfileMember;
    private MFile profile;
    private String name;
    private LocalDateTime date;
    private ArrayList<ChatMessageReactionSummary> reactions;
    private ArrayList<ChatMessageReaction> reaction_detail;
    private boolean bookmark;
    private int threads;
}
