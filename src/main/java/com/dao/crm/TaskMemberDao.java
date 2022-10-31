package com.dao.crm;

import com.mapper.crm.TaskMemberMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class TaskMemberDao {
    private TaskMemberMapper mapper;
    private TaskMemberDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(TaskMemberMapper.class);
    }
}
