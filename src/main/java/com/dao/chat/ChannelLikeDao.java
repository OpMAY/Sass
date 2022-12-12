package com.dao.chat;

import com.mapper.chat.ChannelLikeMapper;
import com.mapper.chat.ChatMessageMapper;
import com.model.chat.channel.Channel;
import com.model.chat.channel.ChannelLike;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public class ChannelLikeDao {
    private final ChannelLikeMapper mapper;
    private ChannelLikeDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(ChannelLikeMapper.class);
    }

    public boolean isChannelLiked(int channel_no, int user_no) {
        return mapper.isChannelLiked(channel_no, user_no);
    }

    public ArrayList<Channel> getLikedChannels(int user_no) {
        return mapper.getLikedChannels(user_no);
    }

    public void insertChannelLike(ChannelLike channelLike) {
        mapper.insertChannelLike(channelLike);
    }

    public void deleteChannelLike(int user_no, int channel_no) {
        mapper.deleteChannelLike(user_no, channel_no);
    }
}
