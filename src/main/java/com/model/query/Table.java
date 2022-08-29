package com.model.query;

import com.model.query.column.Column;
import com.model.query.column.Position;
import com.util.TokenGenerator;
import lombok.Data;

import java.util.ArrayList;

@Data
public class Table {
    private String id;
    private int database_no;
    private String name;
    private ArrayList<Column> columns;
    private Position position;
    private boolean has_primary_key;
    private boolean has_foreign_key;

    public Table sampleTable() {
        String token = TokenGenerator.RandomToken(8);
        this.id = token;
        this.name = token;
        this.position = new Position().samplePosition();
        ArrayList<Column> columns = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            columns.add(new Column().sampleColumn(this.id));
        }
        this.columns = columns;
        return this;
    }

    public Table initTable(int database_no) {
        String token = TokenGenerator.RandomToken(8);
        this.id = token;
        this.database_no = database_no;
        this.name = token;
        this.position = new Position().samplePosition();
        ArrayList<Column> columns = new ArrayList<>();
        for (int i = 0; i < 4; i++) {
            columns.add(new Column().sampleColumn(this.id));
        }
        this.columns = columns;
        return this;
    }
}
