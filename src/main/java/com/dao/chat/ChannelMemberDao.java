package com.dao.chat;

import com.mapper.chat.ChannelMemberMapper;
import com.model.chat.channel.ChannelMember;
import com.model.company.CompanyProfileMember;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public class ChannelMemberDao {
    private final ChannelMemberMapper mapper;

    private ChannelMemberDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(ChannelMemberMapper.class);
    }

    public void insertChannelMember(ChannelMember channelMember) {
        mapper.insertChannelMember(channelMember);
    }

    public void deleteChannelMember(ChannelMember channelMember) {
        mapper.deleteChannelMember(channelMember);
    }

    public ArrayList<CompanyProfileMember> getChannelMembers(int channel_no) {
        return mapper.getChannelMembers(channel_no);
    }

    public ArrayList<ChannelMember> getRawChannelMembers(int channel_no) {
        return mapper.getRawChannelMembers(channel_no);
    }

    public boolean isUserChannelMember(int channel_no, int user_no) {
        return mapper.isUserChannelMember(channel_no, user_no);
    }
}
