package com.mapper.query;

import com.model.query.column.Column;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

public interface ColumnMapper {
    ArrayList<Column> getColumns(String table_id);

    void insertColumn(Column column);

    void insertColumns(ArrayList<Column> columns);

    void updateTableRow(Column column);

    void updateTableRowsOrder(ArrayList<Column> columns);

    void deleteTableRow(@Param("table_id") String table_id, @Param("row_id") String row_id);
}
