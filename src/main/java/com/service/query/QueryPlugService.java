package com.service.query;

import com.dao.query.ColumnDao;
import com.dao.query.DataBaseDao;
import com.dao.query.RelationDao;
import com.dao.query.TableDao;
import com.model.query.DataBase;
import com.model.query.Table;
import com.model.query.column.Line;
import com.model.query.column.Relation;
import com.util.TokenGenerator;
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
        return dataBase;
    }

    @Transactional
    public void createDataBase(DataBase dataBase) {
        // Sample code
        List<Table> tables = new ArrayList<>();
//        List<Relation> relationList = new ArrayList<>();
//
//        for (int i = 0; i < 5; i++) {
//            int random_index = TokenGenerator.RandomInteger(9);
//            int random_index1 = TokenGenerator.RandomInteger(9);
//            int random_index2 = TokenGenerator.RandomInteger(9);
//            int random_index3 = TokenGenerator.RandomInteger(9);
//            relationList.add(new Relation(dataBase.getNo(),
//                    tables.get(random_index).getId(),
//                    tables.get(random_index).getColumns().get(random_index1).getId(),
//                    tables.get(random_index2).getId(),
//                    tables.get(random_index2).getColumns().get(random_index3).getId()));
//        }
//        dataBase.setRelations(relationList);
        // logic
        if (dataBaseDao.checkDataBaseNameExistsOnSameCompany(dataBase.getCompany_no(), dataBase.getName())) {
            log.info("database name Exists");
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
}
