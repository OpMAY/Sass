package com.dao.crm;

import com.mapper.crm.TaskCommentFileMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class TaskCommentFileDao {
    private TaskCommentFileMapper mapper;
    private TaskCommentFileDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(TaskCommentFileMapper.class);
    }
}
