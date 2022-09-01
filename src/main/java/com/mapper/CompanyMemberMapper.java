package com.mapper;

import com.model.company.Company;
import com.model.company.CompanyMember;
import com.model.company.CompanyRole;
import com.model.grant.ROLE;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CompanyMemberMapper {
    boolean checkUserMemberOfCompany(@Param("userNo") int userNo, @Param("companyNo") int companyNo);

    void requestCompanyJoin(@Param("userNo") int userNo, @Param("companyNo") int companyNo);

    boolean checkUserReadAuth(@Param("userNo") int userNo, @Param("companyNo") int companyNo);

    boolean checkUserEditAuth(@Param("userNo") int userNo, @Param("companyNo") int companyNo);

    void updateUserReadAuth(@Param("userNo") int userNo, @Param("companyNo") int companyNo);

    void updateUserEditAuth(@Param("userNo") int userNo, @Param("companyNo") int companyNo);

    ROLE getUserRoleOfCompany(@Param("userNo") int userNo, @Param("companyNo") int companyNo);

    void deleteUserMember(@Param("userNo") int userNo, @Param("companyNo") int companyNo);

    boolean checkUserHasCompany(@Param("userNo") int userNo);

    Company getUserCompany(@Param("userNo") int userNo);

    void registerCompanyMaster(@Param("companyNo") int companyNo, @Param("userNo") int userNo);

    List<CompanyMember> getCompanyMemberList(int companyNo);
}
