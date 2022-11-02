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

    public boolean checkTokenIdAbleToUse(String id) {
        return mapper.checkTokenIdAbleToUse(id);
    }

    public void addSubTask(SubTask subTask) {
        mapper.addSubTask(subTask);
    }

    public SubTask getSubtaskById(String id) {
        return mapper.getSubtaskById(id);
    }

    public void removeSubTask(String sub_task_id) {
        mapper.removeSubTask(sub_task_id);
    }

    public void changeSubTaskStatus(String sub_task_id) {
        mapper.changeSubTaskStatus(sub_task_id);
    }

    public void changeSubTaskName(String sub_task_id, String name) {
        mapper.changeSubTaskName(sub_task_id, name);
    }

    public boolean checkSubTaskCompleted(String sub_task_id) {
        return mapper.checkSubTaskCompleted(sub_task_id);
    }
}
