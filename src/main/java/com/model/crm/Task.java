package com.model.crm;

import com.model.User;
import com.model.common.Time;
import com.model.company.CompanyProfileMember;
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

    private List<SubTask> subTasks;
    private List<CompanyProfileMember> collaborators;
    private int sub_task_count;

    private String project_name;
}
