package com.dao.crm;

import com.mapper.crm.ProjectMapper;
import com.model.crm.Project;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProjectDao {
    private ProjectMapper mapper;

    private ProjectDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(ProjectMapper.class);
    }

    public List<Project> getCompanyProjects(int company_no) {
        return mapper.getCompanyProjects(company_no);
    }

    public void createNewProject(Project project) {
        mapper.createNewProject(project);
    }

    public boolean checkProjectNameDuplicate(String name, int company_no) {
        return mapper.checkProjectNameDuplicate(name, company_no);
    }

    public Project getProjectByNo(int no) {
        return mapper.getProjectByNo(no);
    }

    public void deleteProject(int no) {
        mapper.deleteProject(no);
    }

    public void updateProject(Project project) {
        mapper.updateProject(project);
    }

    public boolean checkProjectNameDuplicateOnUpdate(Project project) {
        return mapper.checkProjectNameDuplicateOnUpdate(project);
    }

    public void copyProject(Project project) {
        mapper.copyProject(project);
    }
}
