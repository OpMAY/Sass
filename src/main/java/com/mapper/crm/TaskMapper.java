package com.mapper.crm;

import com.model.crm.Task;
import org.apache.ibatis.annotations.Param;

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

    void deleteTask(String task_id);

    void changeTaskName(@Param("task_id") String task_id, @Param("name") String name);

    void moveTaskToOtherBoard(@Param("id") String id, @Param("board_id") String board_id);

    void updateTaskOrder(@Param("id") String id, @Param("order") int order);

    void changeTaskDescription(@Param("task_id") String task_id, @Param("description") String description);

    void updateTaskStartDate(@Param("task_id") String task_id, @Param("start_date") String start_date);

    void updateTaskEndDate(@Param("task_id") String task_id, @Param("end_date") String end_date);
}
