
package com.dao;

import com.mapper.CompanyMemberPlugAuthMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class CompanyMemberPlugAuthDao {
    private final CompanyMemberPlugAuthMapper mapper;
}
