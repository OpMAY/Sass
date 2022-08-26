package com.model.query.column;

public enum ForeignKeyConstraint {
    SET_NULL("SET NULL"),
    CASCADE("CASCADE"),
    RESTRICT("RESTRICT"),
    NO_ACTION("NO ACTION"),
    SET_DEFAULT("SET DEFAULT");
    private final String query;

    ForeignKeyConstraint(String query) {
        this.query = query;
    }

    public String getQuery() {
        return query;
    }
}
