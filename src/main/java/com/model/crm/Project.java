package com.model.crm;

import com.model.common.Time;
import lombok.Data;

@Data
public class Project extends Time {
    private int no;
    private int company_no;
    private String name;
}
