package com.dao.chat;

import com.mapper.chat.ChatMessageMapper;
import com.mapper.chat.MessageReadMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class MessageReadDao {
    private MessageReadMapper mapper;
    private MessageReadDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(MessageReadMapper.class);
    }
}
