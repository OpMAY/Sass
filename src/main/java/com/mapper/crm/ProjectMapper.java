package com.mapper.crm;

import com.model.crm.Project;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ProjectMapper {
    List<Project> getCompanyProjects(int company_no);

    void createNewProject(Project project);

    boolean checkProjectNameDuplicate(@Param("name") String name, @Param("company_no") int company_no);

    Project getProjectByNo(int no);

    void deleteProject(int no);

    void updateProject(Project project);

    boolean checkProjectNameDuplicateOnUpdate(Project project);

    void copyProject(Project project);
}