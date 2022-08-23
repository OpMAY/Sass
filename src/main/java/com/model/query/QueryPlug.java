package com.model.query;

import lombok.Data;

import java.util.List;

@Data
public class QueryPlug {
    private int no;
    private String name;
    private String dbVersion;
    private List<DataBase> dataBase;
}
