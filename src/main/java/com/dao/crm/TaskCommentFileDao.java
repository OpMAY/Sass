package com.dao.crm;

import com.mapper.crm.TaskCommentFileMapper;
import com.model.common.MFile;
import com.model.crm.file.TaskFile;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class TaskCommentFileDao {
    private TaskCommentFileMapper mapper;
    private TaskCommentFileDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(TaskCommentFileMapper.class);
    }

    public void connectFileWithComment(int comment_no, int file_no) {
        mapper.connectFileWithComment(comment_no, file_no);
    }

    public TaskFile getFileInfoByCommentNo(int comment_no) {
        return mapper.getFileInfoByCommentNo(comment_no);
    }
}
