package com.model.crm;

import com.model.common.Time;
import lombok.Data;

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
}
