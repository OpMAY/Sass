package com.mapper.chat;

import com.model.chat.chatmessage.ChatMessage;
import com.model.chat.chatmessage.interactions.ChatMessageSave;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

public interface MessageSaveMapper {
    void saveMessage(ChatMessageSave chatMessageSave);

    void deleteSavedMessage(@Param("chat_message_id") String chat_message_id, @Param("user_no") int user_no);

    ArrayList<ChatMessage> getSavedMessages(int user_no);

    boolean checkUserSavedMessage(@Param("id") String id, @Param("user_no") int user_no);
}
