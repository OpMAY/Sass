package com.model.chat.channel;

import com.model.common.Time;
import lombok.Data;

@Data
public class ChannelLike extends Time {
    private int no;
    private int company_member_no;
    private int channel_no;
}
