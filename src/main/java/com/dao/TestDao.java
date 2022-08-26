package com.dao;

import com.mapper.TestMapper;
import com.mapper.query.DataBaseMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;
import org.springframework.test.context.jdbc.Sql;

@Slf4j
@Repository
public class TestDao {

    private final TestMapper mapper;

    public TestDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(TestMapper.class);
    }
}