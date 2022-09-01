package com.service;

import com.dao.CompanyDao;
import com.dao.CompanyMemberDao;
import com.dao.PluginDao;
import com.model.CompanyPluginListData;
import com.model.Plugin;
import com.model.company.Company;
import com.model.company.CompanyMember;
import com.response.Message;
import com.util.TokenGenerator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class CompanyService {
    private final CompanyDao companyDao;
    private final CompanyMemberDao companyMemberDao;
    private final PluginDao pluginDao;

    @Transactional
    public int createCorporate(Company company, int userNo) {
        if(companyDao.checkCompanyNameExists(company.getName())) {
            return -1;
        }
        if(Objects.nonNull(company.getBusiness_code()) && companyDao.checkCompanyBusinessCodeExists(company.getBusiness_code())){
            return -2;
        }
        company.setCompany_id(TokenGenerator.RandomToken(6));
        // Company ID 중복 체크
        while(!checkCompanyIdValid(company.getCompany_id())) {
            company.setCompany_id(TokenGenerator.RandomToken(6));
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


    public Message getUserCorpInfo(int userNo) {
        Message message = new Message();
        Company company = companyMemberDao.getUserCompany(userNo);
        List<CompanyMember> members = companyMemberDao.getCompanyMemberList(company.getNo());
        message.put("company", company);
        message.put("members", members);
        message.put("userRole", companyMemberDao.getUserRoleOfCompany(userNo, company.getNo()));
        return message;
    }

    public Message getUserCorpPluginInfo(int userNo) {
        Message message = new Message();
        Company company = companyMemberDao.getUserCompany(userNo);
        List<CompanyPluginListData> plugins = pluginDao.getCompanyPlugs(company.getNo());
        message.put("plugins", plugins);
        message.put("userRole", companyMemberDao.getUserRoleOfCompany(userNo, company.getNo()));
        return message;
    }
}
