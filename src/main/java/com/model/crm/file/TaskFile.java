package com.model.crm.file;

import com.model.common.MFile;
import com.model.common.Time;
import lombok.Data;

import java.time.format.DateTimeFormatter;

@Data
public class TaskFile extends Time {
    private int no;
    private String task_id;
    private MFile file;

    private String date;
}
