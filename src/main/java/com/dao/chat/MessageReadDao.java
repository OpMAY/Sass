package com.dao.chat;

import com.mapper.chat.MessageReadMapper;
import com.model.chat.chatmessage.interactions.ChatMessageRead;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class MessageReadDao {
    private final MessageReadMapper mapper;

    private MessageReadDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(MessageReadMapper.class);
    }

    public void insertMessageRead(ChatMessageRead chatMessageRead) {
        mapper.insertMessageRead(chatMessageRead);
    }

    public void deleteMessageRead(String chat_message_id, int user_no) {
        mapper.deleteMessageRead(chat_message_id, user_no);
    }

    public boolean checkChannelHasUnRead(int channel_no, int user_no) {
        return mapper.checkChannelHasUnRead(channel_no, user_no);
    }

    public int getChannelUnreadCount(int channel_no, int user_no) {
        return mapper.getChannelUnreadCount(channel_no, user_no);
    }

    public void setAllChannelMessageRead(int channel_no, int user_no) {
        mapper.setAllChannelMessageRead(channel_no, user_no);
    }
}
