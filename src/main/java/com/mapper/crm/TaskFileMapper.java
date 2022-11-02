package com.mapper.crm;

import com.model.crm.file.TaskFile;

import java.util.List;

public interface TaskFileMapper {
    List<TaskFile> getTaskFiles(String task_id);

    List<TaskFile> getProjectFiles(int project_no);

    void deleteFile(int file_no);

    void insertTaskFile(TaskFile file);
}
