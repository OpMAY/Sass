package com.mapper.crm;

import com.model.User;

import java.util.List;

public interface TaskMemberMapper {
    List<User> getTaskMembers(String task_id);

    void copyTask(String original_task, String new_task);
}
