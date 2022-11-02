package com.dao.crm;

import com.mapper.crm.TaskFileMapper;
import com.model.crm.file.TaskFile;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TaskFileDao {
    private TaskFileMapper mapper;

    private TaskFileDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(TaskFileMapper.class);
    }

    public List<TaskFile> getTaskFiles(String task_id) {
        return mapper.getTaskFiles(task_id);
    }

    public List<TaskFile> getProjectFiles(int project_no) {
        return mapper.getProjectFiles(project_no);
    }

    public void deleteFile(int file_no) {
        mapper.deleteFile(file_no);
    }
}
