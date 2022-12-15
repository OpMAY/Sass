package com.dao.chat;

import com.mapper.chat.MessageSaveMapper;
import com.model.chat.chatmessage.ChatMessage;
import com.model.chat.chatmessage.interactions.ChatMessageSave;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public class MessageSaveDao {
    private final MessageSaveMapper mapper;
    private MessageSaveDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(MessageSaveMapper.class);
    }

    public void saveMessage(ChatMessageSave chatMessageSave){
        mapper.saveMessage(chatMessageSave);
    }

    public void deleteSavedMessage(int chat_message_no, int user_no){
        mapper.deleteSavedMessage(chat_message_no, user_no);
    }

    public ArrayList<ChatMessage> getSavedMessages(int user_no){
        return mapper.getSavedMessages(user_no);
    }
}
