package com.mapper.query;

import com.model.query.Table;
import com.model.query.column.Position;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface TableMapper {
    List<Table> getTables(int database_no);

    void insertTable(Table table);

    void insertTables(List<Table> tables);

    void updateTableName(Table table);

    void updateTablePosition(@Param("database_no") int database_no, @Param("table_id") String table_id, @Param("position") Position position);

    void deleteTable(@Param("database_no") int database_no, @Param("table_id") String table_id);
}
