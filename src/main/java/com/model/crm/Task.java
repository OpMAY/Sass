package com.model.crm;

import com.model.common.MFile;
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
    private MFile thumbnail;
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
    /*TODO 2022-12-02 Figma & Query link add*/
    private String plug_figma;
    private String plug_query;
}
