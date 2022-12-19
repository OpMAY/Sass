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

    boolean checkChannelBelongToCompany(@Param("channel_no") int channel_no, @Param("company_no") int company_no);

    ArrayList<Channel> getChannelsByCompanyNoWithLikes(@Param("user_no") int user_no, @Param("company_no") int company_no);

    Channel getTwoUserDirectChannel(@Param("user1_no") int user1_no, @Param("user2_no") int user2_no);

    Channel getMyPrivateChannel(int user_no);

    boolean checkChannelNameDuplicateInCompany(@Param("company_no") int company_no, @Param("name") String name);
}
