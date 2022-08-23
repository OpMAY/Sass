package com.model.query.column;

import lombok.Data;

import java.util.List;

@Data
public class Index {
    private String no;
    private String tableNo;
    private String name;
    private List<Integer> targetColumnList;
}
