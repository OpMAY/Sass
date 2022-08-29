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

    public void insertRelations(List<Relation> relations) {
        mapper.insertRelations(relations);
    }
}
