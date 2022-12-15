package com.mapper.chat;

import com.model.chat.chatmessage.interactions.ChatMessageReaction;
import com.model.chat.chatmessage.interactions.ChatMessageReactionSummary;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

public interface MessageReactionMapper {
    void insertMessageReaction(ChatMessageReaction messageReaction);

    void deleteMessageReaction(@Param("chat_message_id") String chat_message_id, @Param("user_no") int user_no);

    ArrayList<ChatMessageReaction> getMessageReactionsByMessageId(String chat_message_id);

    ArrayList<ChatMessageReactionSummary> getMessageReactionSummary(String id);
}
