package com.model.query.column;

import lombok.Data;

@Data
public class Relation {
    private int database_no;
    private String main_table;
    private String main_column;
    private String target_table;
    private String target_column;
    private ForeignKeyConstraint on_delete = ForeignKeyConstraint.CASCADE;
    private ForeignKeyConstraint on_update = ForeignKeyConstraint.CASCADE;

    public Relation() {

    }

    public Relation(int database_no, String main_table, String main_column, String target_table, String target_column) {
        this.database_no = database_no;
        this.main_table = main_table;
        this.main_column = main_column;
        this.target_table = target_table;
        this.target_column = target_column;
    }
}
