package com.dao.query;

import com.mapper.query.IndexMapper;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class IndexDao {
    private final IndexMapper mapper;

    public IndexDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(IndexMapper.class);
    }
}
