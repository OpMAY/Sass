package com.model.chat;

import com.model.common.MFile;
import com.model.company.CompanyProfileMember;
import lombok.Data;

@Data
public class ChatProfileMember {
    private int member_no;
    private String name;
    private MFile profile;
    private int alarms;
    private boolean is_live;
}
