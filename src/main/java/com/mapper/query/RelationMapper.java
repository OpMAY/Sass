package com.mapper.query;

import com.model.query.column.Relation;

import java.util.List;

public interface RelationMapper {
    void insertRelation(Relation relation);

    void insertRelations(List<Relation> relations);

    List<Relation> getRelations(int database_no);

    boolean checkRelationAlreadyExists(Relation relation);

    void disconnectLine(Relation relation);
}
