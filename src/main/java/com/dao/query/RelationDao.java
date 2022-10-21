package com.dao.query;

import com.mapper.query.RelationMapper;
import com.model.query.column.Relation;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RelationDao {
    private final RelationMapper mapper;

    public RelationDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(RelationMapper.class);
    }

    public void insertRelation(Relation relation) {
        mapper.insertRelation(relation);
    }

    public void insertRelations(List<Relation> relations) {
        mapper.insertRelations(relations);
    }

    public List<Relation> getRelations(int database_no) {
        return mapper.getRelations(database_no);
    }


    public boolean checkRelationAlreadyExists(Relation relation) {
        return mapper.checkRelationAlreadyExists(relation);
    }

    public void disconnectLine(Relation relation) {
        mapper.disconnectLine(relation);
    }

    public boolean checkTableHasForeignKey(String table_id) {
        return mapper.checkTableHasForeignKey(table_id);
    }
}
