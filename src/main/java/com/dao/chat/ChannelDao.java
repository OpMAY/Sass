package com.dao.chat;

import com.mapper.chat.ChannelMapper;
import com.mapper.chat.ChatMessageMapper;
import com.model.chat.channel.Channel;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public class ChannelDao {
    private final ChannelMapper mapper;

    private ChannelDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(ChannelMapper.class);
    }

    public ArrayList<Channel> getMyChannels(int user_no) {
        return mapper.getMyChannels(user_no);
    }

    public ArrayList<Channel> getChannelsByCompanyNo(int company_no) {
        return mapper.getChannelsByCompanyNo(company_no);
    }

    public Channel getChannelByNo(int no) {
        return mapper.getChannelByNo(no);
    }

    public void createChannel(Channel channel) {
        mapper.createChannel(channel);
    }

    public void updateChannel(String name, int no) {
        mapper.updateChannel(name, no);
    }

    public void deleteChannel(int no) {
        mapper.deleteChannel(no);
    }
}
