package com.mapper.chat;

import com.model.chat.chatmessage.interactions.ChatMessageRead;
import org.apache.ibatis.annotations.Param;

public interface MessageReadMapper {
    void insertMessageRead(ChatMessageRead chatMessageRead);

    void deleteMessageRead(@Param("chat_message_id") String chat_message_id, @Param("user_no") int user_no);

    boolean checkChannelHasUnRead(@Param("channel_no") int channel_no, @Param("user_no") int user_no);
}
