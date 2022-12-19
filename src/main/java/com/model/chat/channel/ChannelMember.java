package com.model.chat.channel;

import lombok.Data;

@Data
public class ChannelMember {
    private int no;
    private int channel_no;
    private int company_member_no;

    public ChannelMember(){

    }

    public ChannelMember(int channel_no, int company_member_no) {
        this.channel_no = channel_no;
        this.company_member_no = company_member_no;
    }
}
