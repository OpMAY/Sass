package com.mapper.chat;

import com.model.chat.channel.Channel;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

public interface ChannelMapper {
    ArrayList<Channel> getMyChannels(int user_no);

    ArrayList<Channel> getChannelsByCompanyNo(int company_no);

    Channel getChannelByNo(int no);

    void createChannel(Channel channel);

    void updateChannel(@Param("name") String name, @Param("no") int no);

    void deleteChannel(int no);
}
