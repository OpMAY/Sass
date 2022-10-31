package com.mapper.crm;

import com.model.crm.Task;

import java.util.List;

public interface TaskMapper {
    List<Task> getBoardTasks(String board_id);

    boolean checkTokenIdAbleToUse(String token_id);

    List<Task> getMemberToDoTasks(int member_no);

    List<Task> getMemberCompletedTasks(int member_no);

    List<Task> getMemberExpiredTasks(int member_no);

    void changeTaskStatus(String task_id);

    boolean checkTaskCompleted(String task_id);

    void createTask(Task task);

    void copyTask(Task task);

    Task getTaskById(String task_id);
}
