package com.model.query.column;

import lombok.Data;

@Data
public class Column {
    private String no;
    private String tableNo;
    private int order;
    private String name;
    private String comment;
    private boolean isPrimaryKey = false;
    private boolean isAutoIncrement = false;
    private boolean isUnique = false;
    private boolean isForeignKey = false;
    private boolean isNullable = true;
    private ColumnType type;
    private String defaultValue;
    private Integer size;
}
