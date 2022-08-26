
package com.dao;

import com.mapper.CompanyMemberPlugAuthMapper;
import com.mapper.query.DataBaseMapper;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class CompanyMemberPlugAuthDao {
    private final CompanyMemberPlugAuthMapper mapper;

    public CompanyMemberPlugAuthDao(SqlSession sqlSession) {
        mapper = sqlSession.getMapper(CompanyMemberPlugAuthMapper.class);
    }
}
