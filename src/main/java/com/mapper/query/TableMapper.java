package com.mapper.query;

import com.model.query.Table;

import java.util.List;

public interface TableMapper {
    List<Table> getTables(int database_no);

    void insertTable(Table table);

    void insertTables(List<Table> tables);
}
