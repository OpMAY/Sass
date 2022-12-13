package com.dao.chat;

import com.mapper.chat.ChatMessageMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class ChatMessageDao {
    private final ChatMessageMapper mapper;
    private ChatMessageDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(ChatMessageMapper.class);
    }


}
