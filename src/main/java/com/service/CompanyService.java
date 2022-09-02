package com.service;

import com.dao.CompanyDao;
import com.dao.CompanyMemberDao;
import com.dao.CompanyMemberPlugAuthDao;
import com.dao.PluginDao;
import com.model.CompanyPluginListData;
import com.model.company.Company;
import com.model.company.CompanyMember;
import com.model.company.CompanyMemberListData;
import com.model.grant.GRANT_TYPE;
import com.model.grant.PLUGIN_TYPE;
import com.model.grant.PlugGrant;
import com.model.grant.TeamGrant;
import com.response.DefaultRes;
import com.response.Message;
import com.util.TokenGenerator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    private final CompanyMemberPlugAuthDao companyMemberPlugAuthDao;

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

    @Transactional
    public void changeTeamGrant(TeamGrant grant) {
        if(grant.getType().equals(GRANT_TYPE.READ)) {
            companyMemberDao.updateUserReadAuth(grant.getUser_no());
        } else if (grant.getType().equals(GRANT_TYPE.EDIT)) {
            companyMemberDao.updateUserEditAuth(grant.getUser_no());
        }
    }

    @Transactional
    public void deleteTeamGrant(TeamGrant grant) {
        companyMemberDao.deleteUserMember(grant.getUser_no());
    }

    @Transactional
    public void changePlugGrant(PlugGrant grant) {
        if(grant.getType().equals(GRANT_TYPE.READ)) {
            companyMemberPlugAuthDao.updateUserReadAuth(grant);
        } else if (grant.getType().equals(GRANT_TYPE.EDIT)) {
            companyMemberPlugAuthDao.updateUserEditAuth(grant);
        }
    }

    @Transactional
    public void deletePlugGrant(PlugGrant grant) {
        companyMemberPlugAuthDao.deletePlugGrant(grant);
    }

    @Transactional
    public void addPlugGrant(PlugGrant grant) {
        companyMemberPlugAuthDao.addPlugGrant(grant);
    }

    public Message getUserCorpPluginReadyMembers(int companyNo, int plugNo) {
        Message message = new Message();
        List<CompanyMemberListData> members = companyMemberPlugAuthDao.getUserCorpPluginReadyMembers(companyNo, plugNo);
        PLUGIN_TYPE plugin_type = pluginDao.getPlugType(plugNo);
        message.put("members", members);
        message.put("plugin_type", plugin_type);
        return message;
    }
}
