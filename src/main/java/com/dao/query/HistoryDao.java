package com.dao.query;

import com.mapper.query.HistoryMapper;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class HistoryDao {
    private final HistoryMapper mapper;

    public HistoryDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(HistoryMapper.class);
    }
}
