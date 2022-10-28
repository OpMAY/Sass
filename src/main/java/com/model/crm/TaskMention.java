package com.model.crm;

import com.model.common.Time;
import lombok.Data;

@Data
public class TaskMention extends Time {
    private int no;
    private int member_no;
    private String task_id;
    private int task_comment_no;
}
