package com.dao.chat;

import com.mapper.chat.ChannelMemberMapper;
import com.mapper.chat.ChatMessageMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class ChannelMemberDao {
    private final ChannelMemberMapper mapper;
    private ChannelMemberDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(ChannelMemberMapper.class);
    }
}
