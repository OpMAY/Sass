package com.mapper.crm;

import com.model.User;
import com.model.company.CompanyProfileMember;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface TaskMemberMapper {
    List<CompanyProfileMember> getTaskMembers(String task_id);

    void copyTask(@Param("original_task") String original_task, @Param("new_task") String new_task);

    List<CompanyProfileMember> getAvailableMembers(String task_id);

    boolean isMemberOnTask(@Param("task_id") String task_id, @Param("member_no") int member_no);

    void addTaskMember(@Param("task_id") String task_id, @Param("member_no") int member_no);

    void removeTaskMember(@Param("task_id") String task_id, @Param("member_no") int member_no);
}
