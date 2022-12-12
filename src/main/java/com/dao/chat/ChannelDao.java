package com.dao.chat;

import com.mapper.chat.ChannelMapper;
import com.mapper.chat.ChatMessageMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class ChannelDao {
    private ChannelMapper mapper;
    private ChannelDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(ChannelMapper.class);
    }
}
