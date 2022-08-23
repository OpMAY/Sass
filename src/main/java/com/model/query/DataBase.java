package com.model.query;

import com.model.query.column.Relation;
import lombok.Data;

import java.util.List;

@Data
public class DataBase {
    private String no;
    private int queryPlugNo;
    private DataBaseType databaseType;
    private String name;
    private List<Table> tableList;
    private List<Relation> relationList;
    private String lastUpdateDate;
}
