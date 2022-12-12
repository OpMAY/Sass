package com.dao.chat;

import com.mapper.chat.ChatMessageMapper;
import com.mapper.chat.MessageSaveMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class MessageSaveDao {
    private final MessageSaveMapper mapper;
    private MessageSaveDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(MessageSaveMapper.class);
    }
}
