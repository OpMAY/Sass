package com.dao;

import com.mapper.CompanyMemberMapper;
import com.model.company.Company;
import com.model.company.CompanyRole;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class CompanyMemberDao {
    private CompanyMemberMapper mapper;

    private CompanyMemberDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(CompanyMemberMapper.class);
    }

    public boolean checkUserMemberOfCompany(int userNo, int companyNo) {
        return mapper.checkUserMemberOfCompany(userNo, companyNo);
    }

    public void requestCompanyJoin(int userNo, int companyNo) {
        mapper.requestCompanyJoin(userNo, companyNo);
    }

    public boolean checkUserReadAuth(int userNo, int companyNo) {
        return mapper.checkUserReadAuth(userNo, companyNo);
    }

    public boolean checkUserEditAuth(int userNo, int companyNo) {
        return mapper.checkUserEditAuth(userNo, companyNo);
    }

    public void updateUserReadAuth(int userNo, int companyNo) {
        mapper.updateUserReadAuth(userNo, companyNo);
    }

    public void updateUserEditAuth(int userNo, int companyNo) {
        mapper.updateUserEditAuth(userNo, companyNo);
    }

    public CompanyRole getUserRoleOfCompany(int userNo, int companyNo) {
        return mapper.getUserRoleOfCompany(userNo, companyNo);
    }

    public void deleteUserMember(int userNo, int companyNo) {
        mapper.deleteUserMember(userNo, companyNo);
    }

    public boolean checkUserHasCompany(int userNo) {
        return mapper.checkUserHasCompany(userNo);
    }

    public Company getUserCompany(int userNo) {
        return mapper.getUserCompany(userNo);
    }

    public void registerCompanyMaster(int companyNo, int userNo) {
        mapper.registerCompanyMaster(companyNo, userNo);
    }
}
