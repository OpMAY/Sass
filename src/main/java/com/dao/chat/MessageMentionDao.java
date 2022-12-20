package com.dao.chat;

import com.mapper.chat.MessageMentionMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class MessageMentionDao {
    private final MessageMentionMapper mapper;
    private MessageMentionDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(MessageMentionMapper.class);
    }
}
