package com.dao.crm;

import com.mapper.crm.SubTaskMapper;
import com.model.crm.SubTask;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SubTaskDao {
    private SubTaskMapper mapper;
    private SubTaskDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(SubTaskMapper.class);
    }

    public List<SubTask> getSubtasksByTaskId(String task_id) {
        return mapper.getSubtasksByTaskId(task_id);
    }
}
