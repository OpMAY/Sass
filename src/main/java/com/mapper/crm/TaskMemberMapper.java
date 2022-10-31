package com.mapper.crm;

import com.model.User;
import com.model.company.CompanyProfileMember;

import java.util.List;

public interface TaskMemberMapper {
    List<CompanyProfileMember> getTaskMembers(String task_id);

    void copyTask(String original_task, String new_task);

    List<CompanyProfileMember> getAvailableMembers(String task_id);
}
