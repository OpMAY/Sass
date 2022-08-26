package com.dao.query;

import com.mapper.query.ColumnMapper;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class ColumnDao {
    private final ColumnMapper mapper;

    public ColumnDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(ColumnMapper.class);
    }
}
