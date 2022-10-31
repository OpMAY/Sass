package com.dao.crm;

import com.mapper.crm.TaskMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class TaskDao {
    private TaskMapper mapper;

    private TaskDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(TaskMapper.class);
    }
}
