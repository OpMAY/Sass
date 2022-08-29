package com.dao.query;

import com.mapper.query.TableMapper;
import com.model.query.Table;
import com.model.query.column.Position;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TableDao {
    private final TableMapper mapper;

    public TableDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(TableMapper.class);
    }

    public List<Table> getTables(int database_no) {
        return mapper.getTables(database_no);
    }

    public void insertTable(Table table) {
        mapper.insertTable(table);
    }

    public void insertTables(List<Table> tables) {
        mapper.insertTables(tables);
    }

    public void updateTableName(Table table) {
        mapper.updateTableName(table);
    }

    public void updateTablePosition(int database_no, String table_id, Position position) {
        mapper.updateTablePosition(database_no, table_id, position);
    }

    public void deleteTable(int database_no, String table_id) {
        mapper.deleteTable(database_no, table_id);
    }
}
