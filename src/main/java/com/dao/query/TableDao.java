package com.dao.query;

import com.mapper.query.TableMapper;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class TableDao {
    private final TableMapper mapper;

    public TableDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(TableMapper.class);
    }
}
