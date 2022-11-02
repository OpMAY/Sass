package com.dao.crm;

import com.mapper.crm.TaskCommentMapper;
import com.model.crm.TaskComment;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TaskCommentDao {
    private TaskCommentMapper mapper;
    private TaskCommentDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(TaskCommentMapper.class);
    }

    public List<TaskComment> getTaskComments(String task_id) {
        return mapper.getTaskComments(task_id);
    }

    public void addComment(TaskComment taskComment) {
        mapper.addComment(taskComment);
    }

    public TaskComment getTaskCommentByNo(int no) {
        return mapper.getTaskCommentByNo(no);
    }

    public void deleteComment(int comment_no) {
        mapper.deleteComment(comment_no);
    }
}
