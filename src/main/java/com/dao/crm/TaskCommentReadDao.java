package com.dao.crm;

import com.mapper.crm.TaskCommentReadMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class TaskCommentReadDao {
    private TaskCommentReadMapper mapper;
    private TaskCommentReadDao (SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(TaskCommentReadMapper.class);
    }
}
