package com.dao.crm;

import com.mapper.crm.TaskMentionMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class TaskMentionDao {
    private TaskMentionMapper mapper;
    private TaskMentionDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(TaskMentionMapper.class);
    }
}
