package com.model.chat.channel;

import com.model.common.Time;
import lombok.Data;

@Data
public class Channel extends Time {
    private int no;
    private int company_no;
    private String name;
    private CHANNEL_TYPE type;
}
