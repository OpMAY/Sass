package com.mapper.chat;

import com.model.chat.channel.Channel;
import com.model.chat.channel.ChannelLike;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

public interface ChannelLikeMapper {
    boolean isChannelLiked(@Param("channel_no") int channel_no, @Param("user_no") int user_no);

    ArrayList<Channel> getLikedChannels(int user_no);

    void insertChannelLike(ChannelLike channelLike);

    void deleteChannelLike(@Param("user_no") int user_no, @Param("channel_no") int channel_no);
}
