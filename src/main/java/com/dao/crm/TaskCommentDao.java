package com.dao.crm;

import com.mapper.crm.TaskCommentMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class TaskCommentDao {
    private TaskCommentMapper mapper;
    private TaskCommentDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(TaskCommentMapper.class);
    }
}
