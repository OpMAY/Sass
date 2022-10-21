package com.model.query.column;

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

    public Column sampleColumn(String table_id, int order) {
        String token = TokenGenerator.RandomToken(8);
        this.id = token;
        this.table_id = table_id;
        this.name = token;
        this.type = ColumnType.INT;
        this.comment = token + token;
        this.pk = false;
        this.auto_increment = false;
        this.nullable = false;
        this.order = order;
        return this;
    }
}
