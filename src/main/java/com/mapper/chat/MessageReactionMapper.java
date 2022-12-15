package com.mapper.chat;

import com.model.chat.chatmessage.interactions.ChatMessageReaction;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

public interface MessageReactionMapper {
    void insertMessageReaction(ChatMessageReaction messageReaction);

    void deleteMessageReaction(@Param("chat_message_no") int chat_message_no, @Param("user_no") int user_no);

    ArrayList<ChatMessageReaction> getMessageReactionsByMessageNo(int chat_message_no);
}
