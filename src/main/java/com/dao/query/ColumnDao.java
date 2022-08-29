package com.dao.query;

import com.mapper.query.ColumnMapper;
import com.model.query.column.Column;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public class ColumnDao {
    private final ColumnMapper mapper;

    public ColumnDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(ColumnMapper.class);
    }

    public ArrayList<Column> getColumns(String table_id) {
        return mapper.getColumns(table_id);
    }

    public void insertColumn(Column column) {
        mapper.insertColumn(column);
    }

    public void insertColumns(ArrayList<Column> columns) {
        mapper.insertColumns(columns);
    }

    public void updateTableRow(Column column) {
        mapper.updateTableRow(column);
    }

    public void updateTableRowsOrder(ArrayList<Column> columns) {
        mapper.updateTableRowsOrder(columns);
    }

    public void deleteTableRow(String table_id, String row_id) {
        mapper.deleteTableRow(table_id, row_id);
    }
}
