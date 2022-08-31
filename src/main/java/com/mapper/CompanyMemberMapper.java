package com.mapper;

import com.model.company.Company;
import com.model.company.CompanyRole;

public interface CompanyMemberMapper {
    boolean checkUserMemberOfCompany(int userNo, int companyNo);

    void requestCompanyJoin(int userNo, int companyNo);

    boolean checkUserReadAuth(int userNo, int companyNo);

    boolean checkUserEditAuth(int userNo, int companyNo);

    void updateUserReadAuth(int userNo, int companyNo);

    void updateUserEditAuth(int userNo, int companyNo);

    CompanyRole getUserRoleOfCompany(int userNo, int companyNo);

    void deleteUserMember(int userNo, int companyNo);

    boolean checkUserHasCompany(int userNo);

    Company getUserCompany(int userNo);
}
