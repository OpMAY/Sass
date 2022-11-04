package com.model.crm.file;

import com.model.common.Time;
import lombok.Data;

@Data
public class TaskCommentFile extends Time {
    private int no;
    private int task_comment_no;
    private int task_file_no;
}
