package com.model.query;

import com.model.query.column.Relation;
import lombok.Data;

import java.util.List;

@Data
public class DataBase {
    private int no;
    private int company_no;
    private DataBaseType database_type;
    private String name;
    private List<Table> tables;
    private List<Relation> relations;
    private String description;
    private String create_date;
    private String update_date;
    private String hash_no;
}
