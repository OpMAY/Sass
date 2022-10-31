package com.mapper.crm;

import com.model.crm.SubTask;

import java.util.List;

public interface SubTaskMapper {
    List<SubTask> getSubtasksByTaskId(String task_id);
}
