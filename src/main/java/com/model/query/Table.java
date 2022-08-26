package com.model.query;

import com.model.query.column.Column;
import com.model.query.column.Position;
import com.util.TokenGenerator;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Table {
    private String no;
    private String dataBaseNo;
    private String name;
    private boolean hasPrimaryKey;
    private boolean hasForeignKey;
    private List<Column> columnList;

    // Front Elements
    private double canvasX;
    private double canvasY;

    // Front
    private String id;
    //private String name;
    private ArrayList<Column> columns;
    private Position position;

    public Table sampleTable() {
        String token = TokenGenerator.RandomToken(8);
        this.id = token;
        this.name = token;
        this.position = new Position().samplePosition();
        ArrayList<Column> columns = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            columns.add(new Column().sampleColumn());
        }
        this.columns = columns;
        return this;
    }
}
