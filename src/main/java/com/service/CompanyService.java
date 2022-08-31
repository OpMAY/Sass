package com.service;

import com.dao.CompanyDao;
import com.dao.CompanyMemberDao;
import com.model.company.Company;
import com.util.TokenGenerator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class CompanyService {
    private final CompanyDao companyDao;
    private final CompanyMemberDao companyMemberDao;

    @Transactional
    public int createCorporate(Company company, int userNo) {
        if(companyDao.checkCompanyNameExists(company.getName())) {
            return -1;
        }
        if(Objects.nonNull(company.getBusinessCode()) && companyDao.checkCompanyBusinessCodeExists(company.getBusinessCode())){
            return -2;
        }
        company.setCompanyID(TokenGenerator.RandomToken(6));
        // Company ID 중복 체크
        while(!checkCompanyIdValid(company.getCompanyID())) {
            company.setCompanyID(TokenGenerator.RandomToken(6));
        }
        companyDao.registerCompany(company);
        companyMemberDao.registerCompanyMaster(company.getNo(), userNo);
        return 0;
    }

    private boolean checkCompanyIdValid(String companyId) {
        return companyDao.checkCompanyIdValid(companyId);
    }

    public Company getCompanyNameByCode(String companyId) {
        return companyDao.getCompanyByCompanyID(companyId);
    }

    @Transactional
    public boolean joinCorporate(Company company, int userNo) {
        companyMemberDao.requestCompanyJoin(userNo, company.getNo());
        return companyMemberDao.checkUserMemberOfCompany(userNo, company.getNo());
    }
}
