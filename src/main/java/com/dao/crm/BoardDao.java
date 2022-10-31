package com.dao.crm;

import com.mapper.crm.BoardMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class BoardDao {
    private BoardMapper mapper;
    private BoardDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(BoardMapper.class);
    }
}
