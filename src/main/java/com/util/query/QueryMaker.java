package com.util.query;

import com.model.query.DataBase;
import com.model.query.Table;
import com.model.query.column.Column;
import com.model.query.column.Relation;
import com.util.Time;
import lombok.extern.slf4j.Slf4j;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.*;

@Slf4j
public class QueryMaker {
    private final DataBase dataBase;

    private final String filePath;

    private final List<String> tableList = new ArrayList<>();

    private final Map<String, Column> allColumnMap = new HashMap<>();

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

        for (Table table : dataBase.getTableList()) {
            tableList.add(table.getNo());
            log.info("adding table -> {} - {}", table.getName(), table.getNo());
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
     * @param relationMap : Map(String, List(String))
     * @return List(String)
     * @author OpMAY
     * **/
    private List<String> reformatTableListOnRelation(Map<String, List<String>> relationMap) {
        log.info("relationMap : {}", relationMap);

        List<String> temp = tableList;
        for (String tableId : tableList) {
            log.info("targetId : {}", tableId);
            if (relationMap.containsKey(tableId)) {
                log.info("contained -> {}", tableId);
                List<String> connectedTableList = relationMap.get(tableId);
                int thisTableIdIndex = tableList.indexOf(tableId);
                int biggestIndex = 0;
                for (String str : connectedTableList) {
                    if (tableList.indexOf(str) >= biggestIndex) {
                        biggestIndex = tableList.indexOf(str);
                    }
                }

                log.info("this : {}, biggest : {}", thisTableIdIndex, biggestIndex);


                if (thisTableIdIndex < biggestIndex) {
                    log.info("before swap : {}", temp);
                    Collections.swap(temp, thisTableIdIndex, biggestIndex);
                    log.info("after swap : {}", temp);
                }
            }
        }

        log.info("result => {}", tableList);
        return tableList;
    }

    private boolean checkInitialized() {
        return Objects.nonNull(dataBase);
    }

    private String makeTableQuery(List<String> tableFormattedList, String targetTableUUID) {
        Map<String, Table> tableMap = configTableMap(tableFormattedList);
        StringBuilder builder = new StringBuilder();
        Table nTable = null;

        for (Table table : dataBase.getTableList()) {
            if (Objects.equals(table.getNo(), targetTableUUID)) {
                nTable = table;
                break;
            }
        }

        if (Objects.isNull(nTable)) {
            return "error";
        }
        String tableName = nTable.getName();
        builder.append("-- '").append(tableName).append("' 테이블 생성 쿼리\n");
        List<Column> columnList = nTable.getColumnList();
        makeTableQuery(tableMap, builder, nTable, tableName, columnList);

        return builder.toString();
    }

    private void makeTableQuery(Map<String, Table> tableMap, StringBuilder builder, Table nTable, String tableName, List<Column> columnList) {
        builder.append("CREATE TABLE ").append(tableName).append("\n(\n");
        for (Column column : columnList) {
            builder.append("\t").append(column.getName()).append(" ").append(column.getType());
            builder.append(column.getSize() != null && column.getSize() != 0 ? "(" + column.getSize() + ")" : "");
            builder.append(column.getDefaultValue() != null ? (ERDValidation.checkDefaultValueIsExpression(column.getDefaultValue()) ? " DEFAULT (" + column.getDefaultValue() + ")" : " DEFAULT '" + column.getDefaultValue() + "'") : "");
            builder.append(column.isNullable() ? " NULL" : " NOT NULL");
            builder.append(column.isAutoIncrement() ? " AUTO_INCREMENT" : "");
            builder.append(column.getComment() != null ? " COMMENT '" + column.getComment() + "'" : "");
            builder.append(column.isPrimaryKey() ? " PRIMARY KEY" : "");
            if (!column.equals(columnList.get(columnList.size() - 1))) {
                builder.append(",\n");
            } else {
                if (nTable.isHasForeignKey()) {
                    List<Relation> relationList = dataBase.getRelationList();
                    // 해당 테이블에서 Relation 찾기
                    for (Relation relation : relationList) {
                        if (relation.getMainTable().equals(nTable.getNo())) {
                            // TODO SQL로 변경
                            String nowColumnName = allColumnMap.get(relation.getMainColumn()).getName();
                            Table targetTable = tableMap.get(relation.getTargetTable());
                            String targetTableName = targetTable.getName();
                            String targetColumnName = allColumnMap.get(relation.getTargetColumn()).getName();

                            builder.append(",\n");
                            builder.append("\tCONSTRAINT FK_" + tableName + "_" + nowColumnName + "_" + targetTableName + "_" + targetColumnName + "\n");
                            builder.append("\t\tFOREIGN KEY (" + nowColumnName + ") REFERENCES " + targetTableName + " (" + targetColumnName + ")\n");
                            builder.append("\t\t\tON UPDATE CASCADE ON DELETE CASCADE");
                        }
                    }
                }
            }
        }
        builder.append("\n);\n\n");
    }

    private Map<String, Table> configTableMap(List<String> tableFormattedList) {
        Map<String, Table> tableMap = new LinkedHashMap<>();
        List<Table> tables = dataBase.getTableList();

        for (String tableId : tableFormattedList) {
            for (Table table : tables) {
                log.info("tableId : {}, table.getId : {}", tableId, table.getNo());
                if (table.getNo().equals(tableId)) {
                    tableMap.put(tableId, table);
                }
            }
        }

        return tableMap;
    }

    private String makeCreateQuery(List<String> tableFormattedList) {
        log.info("tableFormattedList : {} -> ", tableFormattedList);
        StringBuilder builder = new StringBuilder();
        builder.append("-- 쿼리 생성 테스트 시작\n");
        Map<String, Table> tableMap = configTableMap(tableFormattedList);

        log.info("tableMap : {}", tableMap);

        for (Map.Entry<String, Table> entry : tableMap.entrySet()) {
            Table table = entry.getValue();
            String nowTableName = table.getName();
            List<Column> columnList = table.getColumnList();
            builder.append("\n-- Table ").append(nowTableName).append(" create Start\n");
            makeTableQuery(tableMap, builder, table, nowTableName, columnList);
        }

        System.out.println("result query file Path : " + createQueryTextFile(builder.toString()));
        return builder.toString();
    }

}
