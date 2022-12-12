package com.dao.chat;

import com.mapper.chat.ChannelLikeMapper;
import com.mapper.chat.ChatMessageMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class ChannelLikeDao {
    private ChannelLikeMapper mapper;
    private ChannelLikeDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(ChannelLikeMapper.class);
    }
}
