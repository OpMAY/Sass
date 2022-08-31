package com.mapper;

import com.model.company.Company;
import com.model.company.CompanyRole;
import org.apache.ibatis.annotations.Param;

public interface CompanyMemberMapper {
    boolean checkUserMemberOfCompany(@Param("userNo") int userNo, @Param("companyNo") int companyNo);

    void requestCompanyJoin(@Param("userNo") int userNo, @Param("companyNo") int companyNo);

    boolean checkUserReadAuth(@Param("userNo") int userNo, @Param("companyNo") int companyNo);

    boolean checkUserEditAuth(@Param("userNo") int userNo, @Param("companyNo") int companyNo);

    void updateUserReadAuth(@Param("userNo") int userNo, @Param("companyNo") int companyNo);

    void updateUserEditAuth(@Param("userNo") int userNo, @Param("companyNo") int companyNo);

    CompanyRole getUserRoleOfCompany(@Param("userNo") int userNo, @Param("companyNo") int companyNo);

    void deleteUserMember(@Param("userNo") int userNo, @Param("companyNo") int companyNo);

    boolean checkUserHasCompany(@Param("userNo") int userNo);

    Company getUserCompany(@Param("userNo") int userNo);

    void registerCompanyMaster(@Param("companyNo") int companyNo, @Param("userNo") int userNo);
}
