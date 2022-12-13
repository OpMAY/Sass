package com.mapper.chat;

import com.model.chat.channel.ChannelMember;
import com.model.company.CompanyProfileMember;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

public interface ChannelMemberMapper {
    void insertChannelMember(ChannelMember channelMember);

    void deleteChannelMember(ChannelMember channelMember);

    ArrayList<CompanyProfileMember> getChannelMembers(int channel_no);

    ArrayList<ChannelMember> getRawChannelMembers(int channel_no);

    boolean isUserChannelMember(@Param("channel_no") int channel_no, @Param("user_no") int user_no);
}
