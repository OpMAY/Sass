package com.model.query;

public enum DataBaseType {
    COMMON("Common"), ORACLE("Oracle"), MYSQL("MySQL"), MSSQL("MSSQL"), MARIA_DB("MariaDB"), POSTGRE_SQL("PostgreSQL");
    private final String type;

    DataBaseType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }
}
