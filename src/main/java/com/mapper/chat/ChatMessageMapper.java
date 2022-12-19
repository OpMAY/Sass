package com.mapper.chat;

import com.model.chat.chatmessage.ChatMessage;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

public interface ChatMessageMapper {
    void sendMessage(ChatMessage chatMessage);

    void deleteMessage(String id);

    void updateMessage(ChatMessage chatMessage);

    ArrayList<ChatMessage> getChannelMessages(int channel_no);

    ArrayList<ChatMessage> getChannelNextMessages(@Param("channel_no") int channel_no, @Param("last_message_id") String last_message_id);

    ChatMessage getChannelLastMessage(int channel_no);

    ChatMessage getChatMessageById(String id);

    boolean checkIdDuplicated(String id);

    int getMessageThreadCount(String id);

    ArrayList<ChatMessage> getThreadMessages(String message_id);

    ArrayList<ChatMessage> getNextThreadMessages(@Param("message_id") String message_id, @Param("last_message_id") String last_message_id);

    boolean checkParentIsThreadMessage(String parent_message_id);
}
