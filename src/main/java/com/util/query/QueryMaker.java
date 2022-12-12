package com.util.query;

import com.model.query.DataBase;
import com.model.query.DataBaseType;
import com.model.query.Table;
import com.model.query.column.Column;
import com.model.query.column.Relation;
import com.util.Time;
import lombok.extern.slf4j.Slf4j;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.util.*;
import java.util.stream.Stream;

@Slf4j
public class QueryMaker {
    private final DataBase dataBase;

    private final String filePath;

    private final List<String> tableList = new ArrayList<>();

    private final Map<String, Column> allColumnMap = new HashMap<>();

    public QueryMaker(DataBase dataBase) {
        allReset();
        this.dataBase = dataBase;
        this.filePath = "";
    }

    public QueryMaker(DataBase dataBase, String filePath) {
        allReset();
        this.dataBase = dataBase;
        this.filePath = filePath;
    }

    public String makeAllTableQuery() {
        ERDValidation erdValidation = init();
        if (erdValidation != null) {
            allColumnMap.putAll(erdValidation.getAllColumnMap());
            return makeCreateQuery(reformatTableListOnRelation(erdValidation.getColumnRelationTableMap()));
        }
        return "error";
    }

    public String makeOneTableQuery(String targetUUID) {
        ERDValidation erdValidation = init();
        if (erdValidation != null) {
            allColumnMap.putAll(erdValidation.getAllColumnMap());
            return makeTableQuery(reformatTableListOnRelation(erdValidation.getColumnRelationTableMap()), targetUUID);
        }
        return "error";
    }

    public String makeAllTableQueryFile() {
        String query = "";
        ERDValidation erdValidation = init();
        if (erdValidation != null) {
            allColumnMap.putAll(erdValidation.getAllColumnMap());
            query = makeCreateQuery(reformatTableListOnRelation(erdValidation.getColumnRelationTableMap()));
            return createQueryTextFile(query);
        } else {
            return "error";
        }
    }

    private void allReset() {
        tableList.clear();
    }

    private ERDValidation init() {
        if (!checkInitialized()) {
            return null;
        }

        allReset();

        for (Table table : dataBase.getTables()) {
            tableList.add(table.getId());
            log.info("adding table -> {} - {}", table.getName(), table.getId());
        }

        log.info("QueryMaker init => {}", tableList);
        ERDValidation erdValidation = new ERDValidation(dataBase);
        if (erdValidation.checkAll()) {
            return erdValidation;
        } else {
            return null;
        }
    }


    // NO Use
    private String makeQuery(boolean allQuery, String targetUUID) {
        /** TODO DataBase 기준 쿼리문 생성 과정
         *  -> ERD Validation 통과 후 작성
         *  1. 모든 Relation 확인
         *  2. FK 관계가 엮여있지 않은 테이블 -> FK 참조 대상 테이블 -> FK 참조 테이블
         *  3. 해당 테이블 ADD CONSTRAINT
         * **/
        ERDValidation erdValidation = init();
        if (erdValidation != null) {
            allColumnMap.putAll(erdValidation.getAllColumnMap());
            if (allQuery) {
                return makeCreateQuery(reformatTableListOnRelation(erdValidation.getColumnRelationTableMap()));
            } else {
                return makeTableQuery(reformatTableListOnRelation(erdValidation.getColumnRelationTableMap()), targetUUID);
            }
        }
        return "error";
    }

    private String createQueryTextFile(String query) {
        if (Objects.isNull(filePath)) {
            return "error";
        }
        String fileName = "QueryPlug_" + Time.TimeFormatter("yyyy_MM_dd_HH_mm_ss") + ".txt";
        File file = new File(filePath, fileName);
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(file))) {
            bw.write(query);
            // try/catch 문에서 자동으로 BufferedWriter Close
            return file.getPath();
        } catch (Exception e) {
            e.printStackTrace();
            return "error : \n" + e;
        }
    }

    /**
     * FK 관계도에 맞춰 테이블 쿼리 실행 순서를 정하는 함수
     *
     * @param relationMap : Map(String, List(String))
     * @return List(String)
     * @author OpMAY
     **/
    private List<String> reformatTableListOnRelation(Map<String, List<String>> relationMap) {
        log.info("relationMap : {}", relationMap);

        // TODO 자기참조 예외
        for (int i = 0; i < tableList.size(); i++) {
            log.info("targetId : {}, i : {}", tableList.get(i), i);
            String tableId = tableList.get(i);
            if (relationMap.containsKey(tableId)) {
                log.info("contained -> {}", tableId);
                for(String key : relationMap.keySet()) {
                    // 자기참조는 순서를 잡는 데에 영향을 미치지 않으므로 삭제
                    relationMap.get(key).removeIf(value -> value.equals(key));
                }
                List<String> connectedTableList = relationMap.get(tableId);
                int connected_table_list_size = connectedTableList.size();
                int count = 0;
                for (int j = 0; j < i; j++) {
                    for (String connectedTable : connectedTableList) {
                        if (connectedTable.equals(tableList.get(j))) {
                            count = count + 1;
                            log.info("count break");
                            break;
                        }
                    }
                    log.info("j : {}", j);
                    if (count == connected_table_list_size) {
                        log.info("same break");
                        break;
                    }
                }

                if (count < connected_table_list_size) {
                    log.info("in before : {}", tableList);
                    tableList.add(tableId);
                    tableList.remove(i);
                    log.info("in after : {}", tableList);
                    i = i - 1;
                }
            }
        }
        log.info("tableList : {}", tableList);
//        for (String tableId : tableList) {
//            log.info("targetId : {}", tableId);
//            if (relationMap.containsKey(tableId)) {
//                log.info("contained -> {}", tableId);
//                List<String> connectedTableList = relationMap.get(tableId);
//                int thisTableIdIndex = tableList.indexOf(tableId);
//                int biggestIndex = 0;
//                for (String str : connectedTableList) {
//                    if (tableList.indexOf(str) >= biggestIndex) {
//                        biggestIndex = tableList.indexOf(str);
//                    }
//                }
//
//                log.info("this : {}, biggest : {}", thisTableIdIndex, biggestIndex);
//
//
//                if (thisTableIdIndex < biggestIndex) {
//                    log.info("before swap : {}", temp);
//                    temp.add(biggestIndex + 1, temp.get(thisTableIdIndex));
//                    log.info("Added : {}", temp);
//                    temp.remove(thisTableIdIndex);
//                    log.info("removed : {}", temp);
////                    Collections.swap(temp, thisTableIdIndex, biggestIndex);
//                }
//            }
//        }

        return tableList;
    }

    private boolean checkInitialized() {
        return Objects.nonNull(dataBase);
    }

    private String makeTableQuery(List<String> tableFormattedList, String targetTableUUID) {
        Map<String, Table> tableMap = configTableMap(tableFormattedList);
        StringBuilder builder = new StringBuilder();
        Table nTable = null;

        for (Table table : dataBase.getTables()) {
            if (Objects.equals(table.getId(), targetTableUUID)) {
                nTable = table;
                break;
            }
        }


        if (Objects.isNull(nTable)) {
            return "error";
        }

        for (Relation relation : dataBase.getRelations()) {
            if (relation.getMain_table().equals(nTable.getId())) {
                nTable.setHas_foreign_key(true);
                break;
            }
        }
        builder.append("-- ").append(dataBase.getDatabase_type().getType()).append(" 데이터베이스 생성 시작");
        String tableName = nTable.getName();
        builder.append("-- '").append(tableName).append("' 테이블 생성 쿼리<br>");
        List<Column> columnList = nTable.getColumns();
        makeTableQuery(tableMap, builder, nTable, tableName, columnList);

        return builder.toString();
    }

    private void makeTableQuery(Map<String, Table> tableMap, StringBuilder builder, Table nTable, String tableName, List<Column> columnList) {
        // CASE (MySQL, MARIA_DB), MSSQL, ORACLE, POSTGRESQL
        List<Column> primaryKeyColumns = new ArrayList<>();
        String autoIncrementStatement = "";
        switch (dataBase.getDatabase_type()) {
            case MYSQL:
            case MARIA_DB:
                autoIncrementStatement = " AUTO_INCREMENT";
                break;
            case MSSQL:
                autoIncrementStatement = " IDENTITY";
                break;
            case POSTGRE_SQL:
                autoIncrementStatement = " GENERATED BY DEFAULT AS IDENTITY";
                break;
            case ORACLE:
                autoIncrementStatement = " GENERATED AS IDENTITY";
                break;
        }
        builder.append("CREATE TABLE ").append("`" + tableName + "`").append("<br>(<br>");
        for (Column column : columnList) {
            builder.append("&nbsp;&nbsp;&nbsp;&nbsp;").append("`" + column.getName() + "`").append(" ").append(column.getType());
            builder.append(column.getSize() != null && column.getSize() != 0 ? "(" + column.getSize() + ")" : "");
            builder.append(column.getDefault_value() != null ? (ERDValidation.checkDefaultValueIsExpression(column.getDefault_value()) ? " DEFAULT (" + column.getDefault_value() + ")" : " DEFAULT '" + column.getDefault_value() + "'") : "");
            builder.append(column.isNullable() ? " NULL" : " NOT NULL");
            builder.append(column.isAuto_increment() ? autoIncrementStatement : "");
            builder.append(column.getComment() != null && column.getComment().trim().length() > 0 ? " COMMENT '" + column.getComment() + "'" : "");
            if (column.isPk()) primaryKeyColumns.add(column);
//            builder.append(column.isPk() ? " PRIMARY KEY" : "");
            if (!column.equals(columnList.get(columnList.size() - 1))) {
                builder.append(",<br>");
            } else {
                // PK 입력
                if (!primaryKeyColumns.isEmpty()) {
                    builder.append(",<br>&nbsp;&nbsp;&nbsp;&nbsp;PRIMARY KEY(");
                    for (Column pkColumn : primaryKeyColumns) {
                        builder.append(pkColumn.getName());
                        if (!pkColumn.equals(primaryKeyColumns.get(primaryKeyColumns.size() - 1))) {
                            builder.append(",");
                        } else {
                            builder.append(")");
                        }
                    }
                }
                // 외래키 입력
                if (nTable.isHas_foreign_key()) {
                    List<Relation> relationList = dataBase.getRelations();
                    // 해당 테이블에서 Relation 찾기
                    for (Relation relation : relationList) {
                        if (relation.getMain_table().equals(nTable.getId())) {
                            // TODO SQL로 변경
                            String nowColumnName = allColumnMap.get(relation.getMain_column()).getName();
                            Table targetTable = tableMap.get(relation.getTarget_table());
                            String targetTableName = targetTable.getName();
                            String targetColumnName = allColumnMap.get(relation.getTarget_column()).getName();

                            builder.append(",<br>");
                            builder.append("&nbsp;&nbsp;&nbsp;&nbsp;CONSTRAINT FK_" + tableName + "_" + nowColumnName + "_" + targetTableName + "_" + targetColumnName + "<br>");
                            builder.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;FOREIGN KEY (" + nowColumnName + ") REFERENCES " + targetTableName + " (" + targetColumnName + ")<br>");
                            builder.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ON UPDATE CASCADE ON DELETE CASCADE");
                        }
                    }
                }
            }
        }
        builder.append("<br>);<br><br>");
        if (dataBase.getDatabase_type().equals(DataBaseType.MSSQL)) {
            builder.append("GO<br>");
        }
    }

    private Map<String, Table> configTableMap(List<String> tableFormattedList) {
        Map<String, Table> tableMap = new LinkedHashMap<>();
        List<Table> tables = dataBase.getTables();

        for (String tableId : tableFormattedList) {
            for (Table table : tables) {
                log.info("tableId : {}, table.getId : {}", tableId, table.getId());
                if (table.getId().equals(tableId)) {
                    tableMap.put(tableId, table);
                }
            }
        }

        return tableMap;
    }

    private String makeCreateQuery(List<String> tableFormattedList) {
        log.info("tableFormattedList : {} -> ", tableFormattedList);
        StringBuilder builder = new StringBuilder();
        builder.append("-- 쿼리 생성 테스트 시작<br>");
        Map<String, Table> tableMap = configTableMap(tableFormattedList);

        log.info("tableMap : {}", tableMap);

        for (Map.Entry<String, Table> entry : tableMap.entrySet()) {
            Table table = entry.getValue();
            String nowTableName = table.getName();
            List<Column> columnList = table.getColumns();
            builder.append("<br>-- Table ").append(nowTableName).append(" create Start<br>");
            makeTableQuery(tableMap, builder, table, nowTableName, columnList);
        }

        System.out.println("result query file Path : " + createQueryTextFile(builder.toString()));
        return builder.toString();
    }

}
