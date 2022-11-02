package com.mapper.crm;

import com.model.crm.TaskComment;

import java.util.List;

public interface TaskCommentMapper {
    List<TaskComment> getTaskComments(String task_id);

    void addComment(TaskComment taskComment);

    TaskComment getTaskCommentByNo(int no);

    void deleteComment(int comment_no);
}
