package com.model.crm;

import com.model.common.Time;
import com.model.company.CompanyProfileMember;
import lombok.Data;

@Data
public class TaskComment extends Time {
    private int no;
    private String task_id;
    private int member_no;
    private TASK_COMMENT_TYPE type;
    private String content;

    private String date;
    private CompanyProfileMember profile;
}
