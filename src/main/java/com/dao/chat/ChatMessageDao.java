package com.dao.chat;

import com.mapper.chat.ChatMessageMapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class ChatMessageDao {
    private ChatMessageMapper mapper;
    private ChatMessageDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(ChatMessageMapper.class);
    }
}
