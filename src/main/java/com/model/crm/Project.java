package com.model.crm;

import com.model.common.Time;
import lombok.Data;

import java.util.List;

@Data
public class Project extends Time {
    private int no;
    private int company_no;
    private String name;
    private String emoji;
    private List<Board> boardList;

    private String hash_no;
}
