package com.mapper;

import com.model.company.CompanyMemberListData;
import com.model.grant.PlugGrant;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CompanyMemberPlugAuthMapper {
    void updateUserReadAuth(PlugGrant grant);

    void updateUserEditAuth(PlugGrant grant);

    void deletePlugGrant(PlugGrant grant);

    void addPlugGrant(PlugGrant grant);

    List<CompanyMemberListData> getUserCorpPluginReadyMembers(@Param("companyNo") int companyNo, @Param("plugNo") int plugNo);
}
