package com.dao.query;

import com.mapper.query.QueryPlugMapper;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;
import org.springframework.test.context.jdbc.Sql;

@Repository
public class QueryPlugDao {
    private final QueryPlugMapper mapper;

    public QueryPlugDao(SqlSession sqlSession){
        this.mapper = sqlSession.getMapper(QueryPlugMapper.class);
    }
}
