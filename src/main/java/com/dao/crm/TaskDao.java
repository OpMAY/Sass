package com.dao.crm;

import com.mapper.crm.TaskMapper;
import com.model.crm.Task;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TaskDao {
    private TaskMapper mapper;

    private TaskDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(TaskMapper.class);
    }

    public List<Task> getBoardTasks(String board_id) {
        return mapper.getBoardTasks(board_id);
    }

    public boolean checkTokenIdAbleToUse(String token_id) {
        return mapper.checkTokenIdAbleToUse(token_id);
    }

    public List<Task> getMemberToDoTasks(int member_no) {
        return mapper.getMemberToDoTasks(member_no);
    }

    public List<Task> getMemberCompletedTasks(int member_no) {
        return mapper.getMemberCompletedTasks(member_no);
    }

    public List<Task> getMemberExpiredTasks(int member_no) {
        return mapper.getMemberExpiredTasks(member_no);
    }

    public void changeTaskStatus(String task_id) {
        mapper.changeTaskStatus(task_id);
    }

    public boolean checkTaskCompleted(String task_id) {
        return mapper.checkTaskCompleted(task_id);
    }

    public void createTask(Task task) {
        mapper.createTask(task);
    }

    public void copyTask(Task task) {
        mapper.copyTask(task);
    }
}
