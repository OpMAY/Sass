package com.mapper.chat;

import com.model.chat.chatmessage.ChatMessage;
import com.model.chat.chatmessage.interactions.ChatMessageMention;

import java.util.ArrayList;

public interface MessageMentionMapper {
    void insertMessageMention(ChatMessageMention messageMention);

    void deleteMessageMention(ChatMessageMention messageMention);

    ArrayList<ChatMessageMention> getMessageMentionsByMessageId(String chat_message_id);

    ArrayList<ChatMessage> getUserMentionedMessages(int user_no);
}
