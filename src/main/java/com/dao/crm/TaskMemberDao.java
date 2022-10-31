package com.dao.crm;

import com.mapper.crm.TaskMemberMapper;
import com.model.User;
import com.model.company.CompanyProfileMember;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TaskMemberDao {
    private TaskMemberMapper mapper;
    private TaskMemberDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(TaskMemberMapper.class);
    }

    public List<CompanyProfileMember> getTaskMembers(String task_id) {
        return mapper.getTaskMembers(task_id);
    }

    public void copyTask(String original_task, String new_task) {
        mapper.copyTask(original_task, new_task);
    }

    public List<CompanyProfileMember> getAvailableMembers(String task_id) {
        return mapper.getAvailableMembers(task_id);
    }
}
