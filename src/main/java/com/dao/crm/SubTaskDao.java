package com.dao.crm;

import com.mapper.crm.SubTaskMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class SubTaskDao {
    private SubTaskMapper mapper;
    private SubTaskDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(SubTaskMapper.class);
    }
}
