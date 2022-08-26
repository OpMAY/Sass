package com.dao.query;

import com.mapper.query.DataBaseMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class DataBaseDao {
    private final DataBaseMapper mapper;

    public DataBaseDao(SqlSession sqlSession){
        mapper = sqlSession.getMapper(DataBaseMapper.class);
    }
}
