package com.mapper.query;

import com.model.query.column.Column;

import java.util.ArrayList;

public interface ColumnMapper {
    ArrayList<Column> getColumns(String table_id);

    void insertColumn(Column column);

    void insertColumns(ArrayList<Column> columns);

}
