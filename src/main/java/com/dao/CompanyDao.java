package com.dao;

import com.mapper.CompanyMapper;
import com.model.company.Company;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class CompanyDao {
    private CompanyMapper mapper;

    private CompanyDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(CompanyMapper.class);
    }

//    public void registerCompany(Company company) {
//        mapper.registerCompany(company);
//    }
//
//    public boolean checkCompanyNameExists(String name) {
//        return mapper.checkCompanyNameExists(name);
//    }
//
//    public boolean checkCompanyBusinessCodeExists(String code) {
//        return mapper.checkCompanyBusinessCodeExists(code);
//    }
//
//    public Company getCompanyByCompanyID(String companyID) {
//        return mapper.getCompanyByCompanyID(companyID);
//    }
}
