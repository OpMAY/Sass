package com.model.query.column;

import static com.model.query.column.DataTypeCategory.*;

// TODO DataBase Type 별 ColumnType -> 완료 목록 : MySQL
public enum ColumnType {
    // 숫자 계열
    BIT(true, 64, true, NUMBER),
    TINYINT(true, 3, true, NUMBER),
    BOOL(false, null, true, NUMBER),
    BOOLEAN(false, null, true, NUMBER),
    SMALLINT(true, 5, true, NUMBER),
    MEDIUMINT(true, 7, true, NUMBER),
    INT(true, 11 , true, NUMBER),
    INTEGER(true, 11, true, NUMBER),
    BIGINT(true, 20, true, NUMBER),
    DECIMAL(true, 65, true, NUMBER),
    DEC(true, 65, true, NUMBER),
    NUMERIC(true, 65, true, NUMBER),
    FIXED(true, 65, true, NUMBER),
    FLOAT(true, 23, true, NUMBER),
    DOUBLE(true, 53, true, NUMBER),
    DOUBLE_PRECISION(true, 255, true, NUMBER),
    REAL(true, 255, true, NUMBER),
    // 문자열
    CHAR(true, 255, true, STRING),
    VARCHAR(true, 65535, true, STRING),
    BINARY(true, 255, true, STRING),
    VARBINARY(true, 65535, true, STRING),
    TINYBLOB(false, null, false, STRING),
    TINYTEXT(false, null, false, STRING),
    BLOB(true, 65535, false, STRING),
    TEXT(true, 65535, false, STRING),
    MEDIUMBLOB(false, null, false, STRING),
    MEDIUMTEXT(false, null, false, STRING),
    LONGBLOB(false, null, false, STRING),
    LONGTEXT(false, null, false, STRING),
    // SPECIAL CASES
    ENUM(true, 65535, true, STRING),
    SET(true, 65535, true, STRING),

    // 시간형형
    DATE(false, null, true, TIME_TYPE),
    TIME(true, 6, true, TIME_TYPE),
    DATETIME(true, 6, true, TIME_TYPE),
    TIMESTAMP(true, 6, true, TIME_TYPE),
    YEAR(false, null, true, TIME_TYPE),

    // JSON Type
    JSON(false, null, true, JSON_TYPE);

    ColumnType(boolean hasSizeParameter, Integer sizeParameterMax, boolean defaultAvailable, DataTypeCategory dataTypeCategory) {
        /** TODO 체크사항
         * 1. 크기에 대한 파라미터가 있는지?
         * 2. 크기에 대한 MAX LIMiT
         * 3. DEFAULT 값 설정이 가능한지?
         * 4. ENUM, SET ?
         * **/
        this.hasSizeParameter = hasSizeParameter;
        this.sizeParameterMax = sizeParameterMax;
        this.defaultAvailable = defaultAvailable;
        this.dataTypeCategory = dataTypeCategory;
    }

    private final boolean hasSizeParameter;

    private final Integer sizeParameterMax;

    private final boolean defaultAvailable;

    private final DataTypeCategory dataTypeCategory;

    public boolean isHasSizeParameter() {
        return hasSizeParameter;
    }

    public Integer getSizeParameterMax() {
        return sizeParameterMax;
    }

    public boolean isDefaultAvailable() {
        return defaultAvailable;
    }

    public DataTypeCategory getDataTypeCategory() {
        return dataTypeCategory;
    }
}
