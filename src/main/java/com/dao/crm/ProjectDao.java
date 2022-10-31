package com.dao.crm;

import com.mapper.crm.ProjectMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class ProjectDao {
    private ProjectMapper mapper;
    private ProjectDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(ProjectMapper.class);
    }
}
