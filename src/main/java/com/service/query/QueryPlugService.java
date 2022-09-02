package com.service.query;

import com.dao.query.ColumnDao;
import com.dao.query.DataBaseDao;
import com.dao.query.RelationDao;
import com.dao.query.TableDao;
import com.model.query.DataBase;
import com.model.query.Table;
import com.model.query.column.Column;
import com.model.query.column.Line;
import com.model.query.column.Position;
import com.model.query.column.Relation;
import com.response.Message;
import com.util.query.ERDValidation;
import com.util.query.QueryMaker;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Slf4j
@Service
@AllArgsConstructor
public class QueryPlugService {
    private final String filePath = "";
    private final DataBaseDao dataBaseDao;
    private final TableDao tableDao;
    private final ColumnDao columnDao;
    private final RelationDao relationDao;

    public boolean checkERDValid(DataBase dataBase) {
        return new ERDValidation(dataBase).checkAll();
    }

    public DataBase getDataBase(int database_no) {
        DataBase dataBase = dataBaseDao.getDataBase(database_no);
        dataBase.setTables(tableDao.getTables(database_no));
        if (!dataBase.getTables().isEmpty()) {
            for (Table table : dataBase.getTables()) {
                table.setColumns(columnDao.getColumns(table.getId()));
            }
        }
        dataBase.setRelations(relationDao.getRelations(database_no));
        return dataBase;
    }

    @Transactional
    public int createDataBase(DataBase dataBase) {
        List<Table> tables = new ArrayList<>();
        if (dataBaseDao.checkDataBaseNameExistsOnSameCompany(dataBase.getCompany_no(), dataBase.getName())) {
            return 0; //database name has exist
        } else {
            dataBaseDao.createDataBase(dataBase);
            tables.add(new Table().initTable(dataBase.getNo()));
            dataBase.setTables(tables);
            tableDao.insertTables(dataBase.getTables());
            for (Table table : dataBase.getTables()) {
                columnDao.insertColumns(table.getColumns());
            }
            if (Objects.nonNull(dataBase.getRelations()) && !dataBase.getRelations().isEmpty()) {
                relationDao.insertRelations(dataBase.getRelations());
            }
            return 1; //database create success
        }
    }

    public boolean checkTokenValid(int database_no, String token) {
        return dataBaseDao.checkTokenValid(database_no, token);
    }

    @Transactional
    public void createTable(int database_no, Table table) {
        table.setDatabase_no(database_no);
        tableDao.insertTable(table);
        for (Column column : table.getColumns()) {
            column.setTable_id(table.getId());
        }
        columnDao.insertColumns(table.getColumns());
    }

    @Transactional
    public void createTableRow(int database_no, String table_id, Column column) {
        column.setTable_id(table_id);
        columnDao.insertColumn(column);
    }

    @Transactional
    public void updateTableName(int database_no, String table_id, Table table) {
        table.setDatabase_no(database_no);
        table.setId(table_id);
        tableDao.updateTableName(table);
    }

    @Transactional
    public void updateTableRow(int database_no, String table_id, Column column) {
        column.setTable_id(table_id);
        columnDao.updateTableRow(column);
    }

    @Transactional
    public void updateTablePosition(int database_no, String table_id, Position position) {
        tableDao.updateTablePosition(database_no, table_id, position);
    }

    @Transactional
    public void updateTableRowsOrder(int database_no, String table_id, ArrayList<Column> columns) {
        for (Column column : columns) {
            column.setTable_id(table_id);
        }
        columnDao.updateTableRowsOrder(columns);
    }

    @Transactional
    public void deleteTable(int database_no, String table_id) {
        tableDao.deleteTable(database_no, table_id);
    }

    @Transactional
    public void deleteTableRow(int database_no, String table_id, String row_id) {
        columnDao.deleteTableRow(table_id, row_id);
    }

    @Transactional
    public void connectLine(int database_no, Line line) {
        Relation relation = new Relation(database_no, line.getTo(), line.getTo_row(), line.getFrom(), line.getFrom_row());
        if (!relationDao.checkRelationAlreadyExists(relation)) {
            relationDao.insertRelation(relation);
        }
    }

    @Transactional
    public void disconnectLine(int database_no, ArrayList<Line> lines) {
        for (Line line : lines) {
            relationDao.disconnectLine(new Relation(database_no, line.getTo(), line.getTo_row(), line.getFrom(), line.getFrom_row()));
        }
    }

    /**
     * 모든 테이블 생성 쿼리 Create
     * {@code @Param}
     *
     * @Return String QueryString
     **/
    public String createAllTableQuery(DataBase dataBase) {
        return new QueryMaker(dataBase, filePath).makeAllTableQuery();
    }

    public String createOneTableQuery(DataBase dataBase) {
        return new QueryMaker(dataBase, filePath).makeOneTableQuery("targetUUID");
    }

    public String createAllTableQueryFile(DataBase dataBase) {
        return new QueryMaker(dataBase, filePath).makeAllTableQueryFile();
    }


    public ArrayList<DataBase> getDatabases(int company_no) {
        return dataBaseDao.getDatabases(company_no);
    }

    public Message checkDatabaseValid(int decryptedNo) {
        Message message = new Message();
        DataBase dataBase = getDataBase(decryptedNo);
        ERDValidation erdValidation = new ERDValidation(dataBase, true);
        if(erdValidation.checkAll()) {
            QueryMaker queryMaker = new QueryMaker(dataBase);
            String query = queryMaker.makeAllTableQuery();
            message.put("query", query);
        } else {
            List<String> errorList = erdValidation.getErrorLogs();
            message.put("errors", errorList);
        }
        return message;
    }
}
