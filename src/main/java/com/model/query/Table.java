package com.model.query;

import com.model.query.column.Column;
import lombok.Data;

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
}
