package com.model.crm;

import com.model.User;
import com.model.common.Time;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class Task extends Time {
    private String id;
    private String board_id;
    private int project_no;
    private String start_date;
    private String end_date;
    private boolean complete;
    private String title;
    private String description;
    private int _order;
    private LocalDateTime completed_datetime;

    private List<User> collaborators;
    private int sub_task_count;

    private String project_name;
}
