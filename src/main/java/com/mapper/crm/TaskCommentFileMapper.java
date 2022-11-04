package com.mapper.crm;

import com.model.common.MFile;
import com.model.crm.file.TaskFile;
import org.apache.ibatis.annotations.Param;

public interface TaskCommentFileMapper {
    void connectFileWithComment(@Param("comment_no") int comment_no, @Param("file_no") int file_no);

    TaskFile getFileInfoByCommentNo(int comment_no);
}
