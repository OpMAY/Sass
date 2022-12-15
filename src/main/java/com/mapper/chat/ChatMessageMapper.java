package com.mapper.chat;

import com.model.chat.chatmessage.ChatMessage;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

public interface ChatMessageMapper {
    void sendMessage(ChatMessage chatMessage);

    void deleteMessage(int no);

    void updateMessage(ChatMessage chatMessage);

    ArrayList<ChatMessage> getChannelMessages(int channel_no);

    ArrayList<ChatMessage> getChannelNextMessages(@Param("channel_no") int channel_no, @Param("last_message_no") int last_message_no);

    ChatMessage getChannelLastMessage(int channel_no);

    ChatMessage getChatMessageByNo(int no);
}
