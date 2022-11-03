package com.model.crm;

import com.model.common.Time;
import lombok.Data;

import java.util.List;

@Data
public class Board extends Time {
    private String id;
    private int project_no;
    private String name;
    private int _order;
    private List<Task> taskList;

    private String class_string;
    private int percent;
}
