package com.model.query.column;

import com.model.query.DataBaseType;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static com.model.query.column.DataTypeCategory.*;
import static com.model.query.DataBaseType.*;

// TODO DataBase Type 별 ColumnType -> 완료 목록 : MySQL
public enum ColumnType {
    /**
     * 1. Type
     * 1) common - 공통
     * 2) MySQL
     * 3) MsSQL
     * 4) ORACLE
     * 5) PostgreSQL
     * 6) MariaDB
     */

    // 숫자 계열
    BIT(true, 64, true, C_NUMBER, new ArrayList<>(Arrays.asList(
            MYSQL,
            MSSQL,
            MARIA_DB
    ))),
    TINYINT(true, 3, true, C_NUMBER, new ArrayList<>(Arrays.asList(
            MYSQL,
            MSSQL,
            MARIA_DB
    ))),
    BOOL(false, null, true, C_NUMBER, new ArrayList<>(Arrays.asList(
            MYSQL,
            POSTGRE_SQL,
            MARIA_DB
    ))),
    BOOLEAN(false, null, true, C_NUMBER, new ArrayList<>(Arrays.asList(
            MYSQL,
            POSTGRE_SQL,
            MARIA_DB
    ))),
    SMALLINT(true, 5, true, C_NUMBER, new ArrayList<>(Arrays.asList(
            MYSQL,
            MSSQL,
            POSTGRE_SQL,
            MARIA_DB
    ))),
    MEDIUMINT(true, 7, true, C_NUMBER, new ArrayList<>(Arrays.asList(
            MYSQL,
            MARIA_DB
    ))),
    INT(true, 11, true, C_NUMBER, new ArrayList<>(Arrays.asList(
            MYSQL,
            MSSQL,
            POSTGRE_SQL,
            MARIA_DB
    ))),
    INTEGER(true, 11, true, C_NUMBER, new ArrayList<>(Arrays.asList(
            MYSQL,
            MARIA_DB
    ))),
    BIGINT(true, 20, true, C_NUMBER, new ArrayList<>(Arrays.asList(
            MYSQL,
            MSSQL,
            MARIA_DB
    ))),
    DECIMAL(true, 65, true, C_NUMBER, new ArrayList<>(Arrays.asList(
            MYSQL,
            MSSQL,
            MARIA_DB
    ))),
    DEC(true, 65, true, C_NUMBER, new ArrayList<>(Arrays.asList(
            MYSQL,
            MARIA_DB

    ))),
    NUMERIC(true, 65, true, C_NUMBER, new ArrayList<>(Arrays.asList(
            MYSQL,
            MSSQL,
            POSTGRE_SQL,
            MARIA_DB
    ))),
    FIXED(true, 65, true, C_NUMBER, new ArrayList<>(Arrays.asList(
            MYSQL,
            MARIA_DB

    ))),
    FLOAT(true, 23, true, C_NUMBER, new ArrayList<>(Arrays.asList(
            MYSQL,
            MSSQL,
            ORACLE,
            POSTGRE_SQL,
            MARIA_DB
    ))),
    DOUBLE(true, 53, true, C_NUMBER, new ArrayList<>(Arrays.asList(
            MYSQL,
            MARIA_DB

    ))),
    DOUBLE_PRECISION(true, 255, true, C_NUMBER, new ArrayList<>(Arrays.asList(
            MYSQL,
            MARIA_DB
    ))),
    REAL(true, 255, true, C_NUMBER, new ArrayList<>(Arrays.asList(
            MYSQL,
            MSSQL,
            POSTGRE_SQL,
            MARIA_DB
    ))),
    // 문자열
    CHAR(true, 255, true, STRING, new ArrayList<>(Arrays.asList(
            MYSQL,
            MSSQL,
            ORACLE,
            POSTGRE_SQL,
            MARIA_DB
    ))),
    VARCHAR(true, 65535, true, STRING, new ArrayList<>(Arrays.asList(
            MYSQL,
            MSSQL,
            POSTGRE_SQL,
            MARIA_DB
    ))),
    BINARY(true, 255, true, STRING, new ArrayList<>(Arrays.asList(
            MYSQL,
            MSSQL,
            MARIA_DB
    ))),
    VARBINARY(true, 65535, true, STRING, new ArrayList<>(Arrays.asList(
            MYSQL,
            MSSQL,
            MARIA_DB
    ))),
    TINYBLOB(false, null, false, STRING, new ArrayList<>(Arrays.asList(
            MYSQL,
            MARIA_DB
    ))),
    TINYTEXT(false, null, false, STRING, new ArrayList<>(Arrays.asList(
            MYSQL,
            MSSQL,
            MARIA_DB
    ))),
    BLOB(true, 65535, false, STRING, new ArrayList<>(Arrays.asList(
            MYSQL,
            ORACLE,
            MARIA_DB
    ))),
    TEXT(true, 65535, false, STRING, new ArrayList<>(Arrays.asList(
            MYSQL,
            MSSQL,
            POSTGRE_SQL,
            MARIA_DB
    ))),
    MEDIUMBLOB(false, null, false, STRING, new ArrayList<>(Arrays.asList(
            MYSQL,
            MARIA_DB
    ))),
    MEDIUMTEXT(false, null, false, STRING, new ArrayList<>(Arrays.asList(
            MYSQL,
            MARIA_DB
    ))),
    LONGBLOB(false, null, false, STRING, new ArrayList<>(Arrays.asList(
            MYSQL,
            MARIA_DB
    ))),
    LONGTEXT(false, null, false, STRING, new ArrayList<>(Arrays.asList(
            MYSQL,
            MARIA_DB
    ))),
    // SPECIAL CASES
    ENUM(true, 65535, true, STRING, new ArrayList<>(Arrays.asList(
            MYSQL,
            MARIA_DB
    ))),
    SET(true, 65535, true, STRING, new ArrayList<>(Arrays.asList(
            MYSQL,
            MARIA_DB
    ))),

    // 시간형형
    DATE(false, null, true, TIME_TYPE, new ArrayList<>(Arrays.asList(
            MYSQL,
            MSSQL,
            ORACLE,
            POSTGRE_SQL,
            MARIA_DB
    ))),
    TIME(true, 6, true, TIME_TYPE, new ArrayList<>(Arrays.asList(
            MYSQL,
            MSSQL,
            POSTGRE_SQL,
            MARIA_DB
    ))),
    DATETIME(true, 6, true, TIME_TYPE, new ArrayList<>(Arrays.asList(
            MYSQL,
            MSSQL,
            MARIA_DB
    ))),
    TIMESTAMP(true, 6, true, TIME_TYPE, new ArrayList<>(Arrays.asList(
            MYSQL,
            ORACLE,
            POSTGRE_SQL,
            MARIA_DB
    ))),
    YEAR(false, null, true, TIME_TYPE, new ArrayList<>(Arrays.asList(
            MYSQL,
            MARIA_DB
    ))),

    // JSON Type
    JSON(false, null, true, JSON_TYPE, new ArrayList<>(Arrays.asList(
            MYSQL,
            POSTGRE_SQL,
            MARIA_DB
    ))),

    DATETIME2(false, null, true, TIME_TYPE, new ArrayList<>(Arrays.asList(
            MSSQL
    ))),

    DATETIMEOFFSET(false, null, true, TIME_TYPE, new ArrayList<>(Arrays.asList(
            MSSQL
    ))),

    SMALLDATETIME(false, null, true, TIME_TYPE, new ArrayList<>(Arrays.asList(
            MSSQL
    ))),

    MONEY(false, null, true, C_NUMBER, new ArrayList<>(Arrays.asList(
            MSSQL
    ))),

    SMALLMONEY(false, null, true, C_NUMBER, new ArrayList<>(Arrays.asList(
            MSSQL
    ))),

    NCHAR(true, 4000, true, STRING, new ArrayList<>(Arrays.asList(
            MSSQL,
            ORACLE
    ))),

    NVARCHAR(true, 4000, true, STRING, new ArrayList<>(Arrays.asList(
            MSSQL,
            ORACLE
    ))),

    VARCHAR2(true, 4000, true, STRING, new ArrayList<>(Arrays.asList(
            ORACLE
    ))),

    NTEXT(false, null, true, STRING, new ArrayList<>(Arrays.asList(
            MSSQL
    ))),

    IMAGE(false, null, true, SPATIAL, new ArrayList<>(Arrays.asList(
            MSSQL
    ))),

    CURSOR(false, null, true, SPATIAL, new ArrayList<>(Arrays.asList(
            MSSQL
    ))),

    ROWVERSION(false, null, true, SPATIAL, new ArrayList<>(Arrays.asList(
            MSSQL
    ))),

    HIERARCHYID(false, null, true, SPATIAL, new ArrayList<>(Arrays.asList(
            MSSQL
    ))),

    UNIQUEIDENTIFIER(false, null, true, SPATIAL, new ArrayList<>(Arrays.asList(
            MSSQL
    ))),

    SQL_VARIANT(false, null, true, SPATIAL, new ArrayList<>(Arrays.asList(
            MSSQL
    ))),

    XML(false, null, true, SPATIAL, new ArrayList<>(Arrays.asList(
            MSSQL
    ))),

    LONG(false, null, true, C_NUMBER, new ArrayList<>(Arrays.asList(
            ORACLE
    ))),

    CLOB(false, null, true, C_NUMBER, new ArrayList<>(Arrays.asList(
            ORACLE
    ))),

    NCLOB(false, null, true, C_NUMBER, new ArrayList<>(Arrays.asList(
            ORACLE
    ))),

    NUMBER(false, null, true, C_NUMBER, new ArrayList<>(Arrays.asList(
            ORACLE
    ))),

    BINARY_FLOAT(false, null, true, C_NUMBER, new ArrayList<>(Arrays.asList(
            ORACLE
    ))),

    BINARY_DOUBLE(false, null, true, C_NUMBER, new ArrayList<>(Arrays.asList(
            ORACLE
    ))),

    BFILE(false, null, true, JSON_TYPE, new ArrayList<>(Arrays.asList(
            ORACLE
    ))),

    FLOAT8(false, null, true, C_NUMBER, new ArrayList<>(Arrays.asList(
            POSTGRE_SQL
    ))),
    TIMESTAMPTZ(false, null, true, TIME_TYPE, new ArrayList<>(Arrays.asList(
            POSTGRE_SQL
    ))),
    INTERVAL(false, null, true, TIME_TYPE, new ArrayList<>(Arrays.asList(
            POSTGRE_SQL
    ))),
    JSONB(false, null, true, JSON_TYPE, new ArrayList<>(Arrays.asList(
            POSTGRE_SQL
    ))),
    UUID(false, null, true, STRING, new ArrayList<>(Arrays.asList(
            POSTGRE_SQL
    )));

    ColumnType(boolean hasSizeParameter, Integer sizeParameterMax, boolean defaultAvailable, DataTypeCategory dataTypeCategory, List<DataBaseType> dataBaseType) {
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
        this.dataBaseType = dataBaseType;
    }

    private final boolean hasSizeParameter;

    private final Integer sizeParameterMax;

    private final boolean defaultAvailable;

    private final DataTypeCategory dataTypeCategory;

    private final List<DataBaseType> dataBaseType;

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

    public List<DataBaseType> getDataBaseType() {
        return dataBaseType;
    }

    public boolean isTypeAvailable(DataBaseType type) {
        return dataBaseType.contains(type);
    }

    public List<ColumnType> getDataBaseColumnTypes(DataBaseType dataBaseType) {
        List<ColumnType> columnTypes = new ArrayList<>();
        for (ColumnType columnType : ColumnType.values()) {
            if (columnType.getDataBaseType().contains(dataBaseType)) {
                columnTypes.add(columnType);
            }
        }
        return columnTypes;
    }
}
