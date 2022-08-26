package com.dao;

import com.mapper.CompanyPlugMapper;
import com.mapper.query.DataBaseMapper;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class CompanyPlugDao {
    private final CompanyPlugMapper mapper;

    public CompanyPlugDao(SqlSession sqlSession){
        mapper = sqlSession.getMapper(CompanyPlugMapper.class);
    }
}
