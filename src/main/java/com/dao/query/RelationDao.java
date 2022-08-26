package com.dao.query;

import com.mapper.query.RelationMapper;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class RelationDao {
    private final RelationMapper mapper;

    public RelationDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(RelationMapper.class);
    }
}
