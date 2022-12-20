package com.dao;

import com.mapper.CompanyMemberMapper;
import com.model.company.*;
import com.model.grant.ROLE;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.List;

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

    public void updateUserReadAuth(int userNo) {
        mapper.updateUserReadAuth(userNo);
    }

    public void updateUserEditAuth(int userNo) {
        mapper.updateUserEditAuth(userNo);
    }

    public ROLE getUserRoleOfCompany(int userNo, int companyNo) {
        return mapper.getUserRoleOfCompany(userNo, companyNo);
    }

    public void deleteUserMember(int userNo) {
        mapper.deleteUserMember(userNo);
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

    public List<CompanyMemberListData> getCompanyMemberList(int companyNo) {
        return mapper.getCompanyMemberList(companyNo);
    }

    public List<CompanyProfileMember> getCompanyMemberTagList(int company_no) {
        return mapper.getCompanyMemberTagList(company_no);
    }

    public CompanyMember getCompanyMemberInfoByMemberNo(int member_no) {
        return mapper.getCompanyMemberInfoByMemberNo(member_no);
    }

    public boolean checkMemberIsCompanyMember(int member_no, int company_no) {
        return mapper.checkMemberIsCompanyMember(member_no, company_no);
    }

    public CompanyProfileMember getCompanyMemberProfile(int member_no) {
        return mapper.getCompanyMemberProfile(member_no);
    }

    public CompanyMember getUserMemberInfo(int user_no, int company_no) {
        return mapper.getUserMemberInfo(user_no, company_no);
    }

    public CompanyMember getUserMemberInfoByUserNo(int user_no) {
        return mapper.getUserMemberInfoByUserNo(user_no);
    }
}
