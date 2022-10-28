package com.model.crm;

import com.model.common.Time;
import lombok.Data;

@Data
public class SubTask extends Time {
    private String id;
    private String task_id;
    private String title;
    private boolean complete;
}
