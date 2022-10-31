package com.dao.crm;

import com.mapper.crm.TaskFileMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class TaskFileDao {
    private TaskFileMapper mapper;
    private TaskFileDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(TaskFileMapper.class);
    }
}
