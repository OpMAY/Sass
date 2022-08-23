package com.model.query.column;

import lombok.Data;

@Data
public class Relation {
    private String mainTable;
    private String mainColumn;
    private String targetTable;
    private String targetColumn;
    private ForeignKeyConstraint onDelete;
    private ForeignKeyConstraint onUpdate;
}
