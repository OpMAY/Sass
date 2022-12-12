package com.dao.chat;

import com.mapper.chat.ChatMessageMapper;
import com.mapper.chat.MessageReactionMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class MessageReactionDao {
    private final MessageReactionMapper mapper;
    private MessageReactionDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(MessageReactionMapper.class);
    }
}
