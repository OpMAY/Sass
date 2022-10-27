package com.util.query;

import com.model.query.DataBase;
import com.model.query.Table;
import com.model.query.column.Column;
import com.model.query.column.ColumnType;
import com.model.query.column.DataTypeCategory;
import com.model.query.column.Relation;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONException;
import org.json.JSONObject;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Slf4j
public class ERDValidation {

    private final DataBase dataBase;
    private final boolean logging;

    private final List<String> errorLogs = new ArrayList<>();

    private final Map<String, Column> allColumnMap = new HashMap<>();

    private final Map<String, String> columnRelationMap = new HashMap<>();

    private final Map<String, List<String>> columnRelationTableMap = new HashMap<>();


    public ERDValidation(DataBase dataBase) {
        allReset();
        this.dataBase = dataBase;
        this.logging = false;
    }

    public ERDValidation(DataBase dataBase, boolean logging) {
        allReset();
        this.dataBase = dataBase;
        this.logging = logging;
    }

    public Map<String, Column> getAllColumnMap() {
        return allColumnMap;
    }

    public List<String> getErrorLogs() {
        return errorLogs;
    }

    public boolean checkAll() {
        allReset();
        if (checkInitialized()) {
            log.info("error : set ERD first");
            return false;
        }

        log.info("database -> {}", dataBase);

        // SET ALL COLUMNS with Valid Check
        for (Table table : this.dataBase.getTables()) {
            for (Column column : table.getColumns()) {
                if (!checkColumnValid(column)) {
                    log.info("One of the Column is not valid, check log -> {}", column);
                    return false;
                }
                allColumnMap.put(column.getId(), column);
            }
        }

        // FK Check
        for (Relation relation : this.dataBase.getRelations()) {
            if (!checkRelationValid(relation)) {
                log.info("One of the Relation is not valid, check log");
                return false;
            }
        }
        return true;
    }

    public Map<String, String> getColumnRelationMap() {
        return columnRelationMap;
    }

    public Map<String, List<String>> getColumnRelationTableMap() {
        return columnRelationTableMap;
    }

    private boolean checkInitialized() {
        return Objects.isNull(this.dataBase);
    }

    private void allReset() {
        this.columnRelationMap.clear();
        this.allColumnMap.clear();
        this.errorLogs.clear();
    }

    /**
     * 컬럼 Validation Check
     *
     * @param column : Column
     * @return boolean
     * @author OpMAY
     * @see ERDValidation#checkPrimaryKeyValid(Column)
     * @see ERDValidation#checkNameValid(String)
     * @see ERDValidation#checkColumnSizeValid(Column)
     * @see ERDValidation#checkColumnDefaultValue(Column)
     * @see ERDValidation#autoIncrementRuleCheck(Column)
     **/
    private boolean checkColumnValid(Column column) {
        /**
         * TODO Column Valid Check (PK, name, defaultValue, size, FK)
         *
         * **/
        // PK Validation
        boolean a = (!column.isPk() || checkPrimaryKeyValid(column));
        // name Validation
        // TODO column 외에 Table 등 name check 필요
        boolean b = checkNameValid(column.getName());
        // size Validation
        boolean c = checkColumnSizeValid(column);
        // defaultValue Validation (Not Use)
        boolean d = checkColumnDefaultValue(column);
        // A.I Validation
        boolean e = autoIncrementRuleCheck(column);

        boolean result = a && b && c && e;
        if (!result && logging) {
            StringBuilder errBuilder = new StringBuilder();
            errBuilder.append("Error Column : ").append(column.getName());
            errBuilder.append("\nError Type");
            if (!a) {
                errBuilder.append("\nPrimary Key의 조건이 맞지 않습니다.");
            }
            if (!b) {
                errBuilder.append("\n컬럼 명의 조건이 맞지 않습니다. 컬럼 명 길이 : ").append(column.getName().length());
            }
            if (!c) {
                errBuilder.append("\n컬럼 사이즈가 type의 조건에 올바르지 않습니다. 컬럼 type : ").append(column.getType()).append(", 컬럼 사이즈 설정 가능 여부 : ").append(column.getType().isHasSizeParameter()).append(", 컬럼 사이즈 최대 길이 : ").append(column.getType().getSizeParameterMax());
            }
            if (!e) {
                errBuilder.append("\nauto_increment 컬럼의 조건이 맞지 않습니다. Number Type 컬럼만 가능합니다, 현재 Type : ").append(column.getType());
            }
            errorLogs.add(errBuilder.toString());
        }
        return result;
    }

    private boolean autoIncrementRuleCheck(Column column) {
        return !column.isAuto_increment() || (column.isAuto_increment() && column.getType().getDataTypeCategory().equals(DataTypeCategory.C_NUMBER));
    }

    private boolean checkRelationValid(Relation relation) {
        /**
         * FK 검증 로직
         * 1. type이 서로 맞지 않으면 불가
         * 2. 서로 참조 불가
         * 3. 자기 참조는 가능
         * 4. FK 대상 컬럼이 UNIQUE OR PRIMARY (UNIQUE 는 필수)
         * + 한 컬럼당 하나의 컬럼에 FK를 걸 수 있음,
         *   단, 한 컬럼이 다수의 컬럼의 FK 대상이 될 수는 있음
         * 5. TODO 순환 참조 검사 => Front 단에서 검사 (연산처리 최적화)
         * **/
        Column targetColumn = allColumnMap.get(relation.getTarget_column());
        Column mainColumn = allColumnMap.get(relation.getMain_column());
        log.info("checking relation valid : {} => {} ...", mainColumn.getId(), targetColumn.getId());
        columnRelationMap.put(mainColumn.getId(), targetColumn.getId());
        if (columnRelationTableMap.containsKey(relation.getMain_table())) {
            List<String> list = columnRelationTableMap.get(relation.getMain_table());
            list.add(relation.getTarget_table());
            columnRelationTableMap.replace(relation.getMain_table(), list);
        } else {
            List<String> list = new ArrayList<>();
            list.add(relation.getTarget_table());
            columnRelationTableMap.put(relation.getMain_table(), list);
        }
        // 1
        if (targetColumn.getType() != mainColumn.getType() && !Objects.equals(targetColumn.getSize(), mainColumn.getSize())) {
            log.info("FK 참조를 하려는 컬럼 간의 타입이 맞지 않습니다.\n{} : {}({}) => {} : {}({})", mainColumn.getId(), mainColumn.getType(), mainColumn.getSize(), targetColumn.getId(), targetColumn.getType(), targetColumn.getSize());
            if (logging) {
                errorLogs.add("FK 참조를 하려는 컬럼 간의 타입이 맞지 않습니다.\n" + mainColumn.getName() + ":" + mainColumn.getType() + "(" + mainColumn.getSize() + ") => " + targetColumn.getName() + " : " + targetColumn.getType() + "(" + targetColumn.getSize() + ")");
            }
            return false;
        }

        // 2, 3
        if ((!Objects.equals(mainColumn.getId(), targetColumn.getId())) && Objects.equals(columnRelationMap.get(targetColumn.getId()), columnRelationMap.get(mainColumn.getId()))) {
            /**
             * 1. 자기참조 검사 X
             * 2. targetColumn이 이미 mainColumn을 FK 걸어놨을 때
             * **/
            log.info("서로 참조는 불가능합니다. {}, {}", mainColumn.getId(), targetColumn.getId());
            if (logging) {
                errorLogs.add("서로 참조는 불가능합니다. " + mainColumn.getName() + ", " + targetColumn.getName());
            }
            return false;
        }

        // 4
//        if (!targetColumn.is_unique()) {
//            /**
//             * Unique 컬럼에만 FK 참조 가능
//             *  PrimaryKey는 checkPrimaryKeyValid() 함수를 통해 Unique 검증을 하므로 따로 조건 X
//             * **/
//            log.info("Unique 속성이 있는 컬럼에만 FK 참조가 가능합니다. target : {} => unique : {}", targetColumn.getId(), targetColumn.is_unique());
//            return false;
//        }

        // 5 - X

        return true;
    }

    private boolean checkPrimaryKeyValid(Column column) {
        return !column.isNullable()
                && (column.getType().getDataTypeCategory().equals(DataTypeCategory.STRING) || column.getType().getDataTypeCategory().equals(DataTypeCategory.C_NUMBER));

//        column.is_unique()
//                &&
    }

    /**
     * Name Valid Check
     *
     * @param name : String
     * @return Boolean
     * @code Identifier                      Maximum Length (characters)<br><hr>
     * Database                        64<br>
     * Table                           64<br>
     * Column                          64<br>
     * Index                           64<br>
     * Constraint                      64<br>
     * Stored Procedure or Function    64<br>
     * Trigger                         64<br>
     * View                            64<br>
     * Alias                           256<br>
     * Compound Statement Label        16<br>
     * @author OpMAY
     **/
    private boolean checkNameValid(String name) {
        log.info("checkNameValid - name.length : {}", name.length());
        // MySQL 기준 모든 table, column 최대 길이 64

        return name.length() > 0 && name.length() < 65;
    }

    private boolean checkColumnSizeValid(Column column) {
        if (column.getSize() != null && column.getSize() != 0) {
            if (!column.getType().isHasSizeParameter()) {
                log.info("Type '{}' can not get Size Parameter", column.getType().name());
                return false;
            } else if (column.getSize() > column.getType().getSizeParameterMax()) {
                log.info("Type size limit exceed, input : {}, type limit : {}", column.getSize(), column.getType().getSizeParameterMax());
                return false;
            } else {
                return true;
            }
        } else {
            // Size 없으면 기본 0으로 세팅 => 최댓값
            column.setSize(0);
            return true;
        }
    }

    private boolean checkColumnDefaultValue(Column column) {
        if (Objects.nonNull(column.getDefault_value()) && !column.getDefault_value().trim().isEmpty()) {
            // Default Value 가 설정되어있을 때
            if (!column.getType().isDefaultAvailable()) {
                // 기본값 설정 불가능한 타입
                log.info("Type '{}' can not set Default Value", column.getType().name());
                return false;
            } else {
                // 기본값이 SQL 함수(expression)의 형태가 아닌 일반 값일 때
                switch (column.getType().getDataTypeCategory()) {
                    case C_NUMBER:
                        try {
                            double a = Double.parseDouble(column.getDefault_value());
                            long bit = Double.doubleToLongBits(a);
                            /**
                             *  1. BOOL / BOOLEAN => value = 0 or 1 or 'true' or 'false'
                             *  2. 사이즈 지정되어있으면, 사이즈보다 크면 안됨
                             *  3. 사이즈 지정 안되어있으면 기본 Type의 MAX 보다 크면 안됨
                             * **/
                            return ((Objects.equals(column.getType(), ColumnType.BOOL) || Objects.equals(column.getType(), ColumnType.BOOLEAN)) && (a == 0 || a == 1 || column.getDefault_value().equals("true") || column.getDefault_value().equals("false"))) // 1
                                    || (column.getSize() == null && bit <= column.getType().getSizeParameterMax()) // 2
                                    || (column.getSize() != null && bit <= column.getSize()); // 3
                        } catch (NumberFormatException e) {
                            return false;
                        }
                    case STRING:
                        /**
                         * 1. 기본 값 설정 가능한 Type 인지 --> 위에서 Check
                         * 2. 사이즈 지정되어있으면, 사이즈보다 크면 안됨
                         * 3. 사이즈 지정 안되어있으면 기본 Type의 MAX 보다 크면 안됨
                         * **/
                        return ((column.getSize() == null && column.getDefault_value().length() <= column.getType().getSizeParameterMax()) // 2
                                || (column.getSize() != null && column.getDefault_value().length() <= column.getSize()));
                    case TIME_TYPE:
                        /**
                         * 시간 계열의 Default value 는 함수 사용이 대부분
                         * -> 간단한 함수는 문제 없지만, 복잡한 함수는 이를 검증하기 까다로움
                         * -> Front 단에서 시간이라면 calender를 이용하여 해당 Type에 맞게 formatting 해서 가져오기
                         * -> 함수라면 특정 함수만 지정하여 사용할 수 있게 제작
                         * **/
                        // 시간 유형은 시간 형태면 됨
                        if (checkDefaultValueIsExpression(column.getDefault_value())) {
                            return true;
                        } else {
                            switch (column.getType()) {
                                case DATE:
                                    return checkTimeTypeDefaultValueValid("yyyy-MM-dd", column.getDefault_value());
                                case TIME:
                                    return checkTimeTypeDefaultValueValid("hh:mm:ss.SSSSSS", column.getDefault_value());
                                case DATETIME:
                                case TIMESTAMP:
                                    return checkTimeTypeDefaultValueValid("yyyy-MM-dd hh:mm:ss.SSSSSS", column.getDefault_value());
                                case YEAR:
                                    return checkTimeTypeDefaultValueValid("yyyy", column.getDefault_value());
                                default:
                                    return false;
                            }
                        }
                    case JSON_TYPE:
                        return checkJsonDefaultValueValid(column.getDefault_value());
                    case SPATIAL: // ProtoType : 공간 Type 지원 X
                    default:
                        return false;
                }
            }
        } else {
            return true;
        }
    }

    private boolean checkTimeTypeDefaultValueValid(String pattern, String value) {
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat(pattern);
            dateFormat.parse(value);
            return true;
        } catch (ParseException e) {
            return false;
        }
    }

    private boolean checkJsonDefaultValueValid(String value) {
        if (jsonDefaultValueFunctionList.contains(value)) {
            // JSON Default Value Function : JSON_ARRAY(), JSON_OBJECT()
            return true;
        } else {
            // CHECK Value is JSON
            try {
                new JSONObject(value);
                return true;
            } catch (JSONException e) {
                return false;
            }
        }
    }

    public static boolean checkDefaultValueIsExpression(String defaultValue) {
        return timeDefaultValueFunctionList.contains(defaultValue) || jsonDefaultValueFunctionList.contains(defaultValue);
    }

    // PK로 올 수 있는 Type = STRING, INT 종류 NO USE
    private final ArrayList<ColumnType> primaryAvailableTypes = new ArrayList<>(Arrays.asList(
            ColumnType.VARCHAR,
            ColumnType.INTEGER,
            ColumnType.CHAR,
            ColumnType.INT,
            ColumnType.NUMBER
    ));

    private static final ArrayList<String> jsonDefaultValueFunctionList = new ArrayList<>(Arrays.asList(
            "JSON_ARRAY()",
            "JSON_OBJECT()"
    ));

    private static final ArrayList<String> timeDefaultValueFunctionList = new ArrayList<>(Arrays.asList(
            "NOW()",
            "now()",
            "CURTIME()",
            "curtime()",
            "CURDATE()",
            "curdate()"
    ));
}

