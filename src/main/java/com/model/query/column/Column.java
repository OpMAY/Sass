package com.model.query.column;

import com.util.TokenGenerator;
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

    private String id;
    //private String name;
    //private String type;
    //private String comment;
    private boolean pk;
    private boolean auto_increment;
    private boolean nullable;

    public Column sampleColumn() {
        String token = TokenGenerator.RandomToken(8);
        this.id = token;
        this.name = token;
        this.type = ColumnType.INT;
        this.comment = token + token;
        this.pk = false;
        this.auto_increment = false;
        this.nullable = false;
        return this;
    }
}
