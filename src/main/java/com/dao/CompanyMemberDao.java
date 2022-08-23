package com.dao;

import com.mapper.CompanyMemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class CompanyMemberDao {
    private final CompanyMemberMapper mapper;
}
