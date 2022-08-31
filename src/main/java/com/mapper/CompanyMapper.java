package com.mapper;

import com.model.company.Company;

public interface CompanyMapper {
    void registerCompany(Company company);

    boolean checkCompanyNameExists(String name);

    boolean checkCompanyBusinessCodeExists(String code);

    Company getCompanyByCompanyID(String companyID);

    boolean checkCompanyIdValid(String companyId);
}
