package com.model.query.column;

import com.model.query.DataBaseType;
import com.util.TokenGenerator;
import lombok.Data;

@Data
public class Column {
    private String id;
    private String table_id;
    private int order;
    private String name;
    private String comment;
    private ColumnType type;
    private boolean pk;
    private boolean auto_increment;
    private boolean nullable;

    // Require For Query validate Options (FK)
    private boolean is_unique = false;
    // REQUIRE?
    private String default_value;
    private Integer size;

    public Column sampleColumn(String table_id, int order, DataBaseType dataBaseType) {
        String token = TokenGenerator.RandomToken(8);
        this.id = token;
        this.table_id = table_id;
        this.name = "Column " + order;
        if(order == 1) {
            if(dataBaseType.equals(DataBaseType.ORACLE)) {
                this.type = ColumnType.NUMBER;
            } else {
                this.type = ColumnType.INT;
            }
            this.pk = true;
            this.auto_increment = true;
            this.nullable = false;
        } else {
            if(dataBaseType.equals(DataBaseType.ORACLE)) {
                this.type = ColumnType.NVARCHAR;
            } else {
                this.type = ColumnType.VARCHAR;
            }
            this.size = 45;
            this.pk = false;
            this.auto_increment = false;
            this.nullable = true;
        }
        this.order = order;
        return this;
    }
}
