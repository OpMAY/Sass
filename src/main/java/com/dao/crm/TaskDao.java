package com.dao.crm;

import com.mapper.crm.TaskMapper;
import com.model.common.MFile;
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

    public Task getTaskById(String task_id) {
        return mapper.getTaskById(task_id);
    }

    public void deleteTask(String task_id) {
        mapper.deleteTask(task_id);
    }

    public void changeTaskName(String task_id, String name) {
        mapper.changeTaskName(task_id, name);
    }

    public void moveTaskToOtherBoard(String id, String board_id) {
        mapper.moveTaskToOtherBoard(id, board_id);
    }

    public void updateTaskOrder(String id, int order) {
        mapper.updateTaskOrder(id, order);
    }

    public void changeTaskDescription(String task_id, String description) {
        mapper.changeTaskDescription(task_id, description);
    }

    public void updateTaskStartDate(String task_id, String start_date) {
        mapper.updateTaskStartDate(task_id, start_date);
    }

    public void updateTaskEndDate(String task_id, String end_date) {
        mapper.updateTaskEndDate(task_id, end_date);
    }

    public void changeTaskThumbnail(String task_id, MFile thumbnail) {
        mapper.changeTaskThumbnail(task_id, thumbnail);
    }
}
