
package com.dao;

import com.mapper.CompanyMemberPlugAuthMapper;
import com.mapper.query.DataBaseMapper;
import com.model.company.CompanyMemberListData;
import com.model.grant.PlugGrant;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CompanyMemberPlugAuthDao {
    private final CompanyMemberPlugAuthMapper mapper;

    public CompanyMemberPlugAuthDao(SqlSession sqlSession) {
        mapper = sqlSession.getMapper(CompanyMemberPlugAuthMapper.class);
    }

    public void updateUserReadAuth(PlugGrant grant) {
        mapper.updateUserReadAuth(grant);
    }

    public void updateUserEditAuth(PlugGrant grant) {
        mapper.updateUserEditAuth(grant);
    }

    public void deletePlugGrant(PlugGrant grant) {
        mapper.deletePlugGrant(grant);
    }

    public void addPlugGrant(PlugGrant grant) {
        mapper.addPlugGrant(grant);
    }

    public List<CompanyMemberListData> getUserCorpPluginReadyMembers(int companyNo, int plugNo) {
        return mapper.getUserCorpPluginReadyMembers(companyNo, plugNo);
    }
}
