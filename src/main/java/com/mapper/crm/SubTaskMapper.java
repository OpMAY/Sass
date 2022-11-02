package com.mapper.crm;

import com.model.crm.SubTask;

import java.util.List;

public interface SubTaskMapper {
    List<SubTask> getSubtasksByTaskId(String task_id);

    boolean checkTokenIdAbleToUse(String id);

    void addSubTask(SubTask subTask);

    SubTask getSubtaskById(String id);

    void removeSubTask(String sub_task_id);

    void changeSubTaskStatus(String sub_task_id);

    void changeSubTaskName(String sub_task_id, String name);

    boolean checkSubTaskCompleted(String sub_task_id);
}
