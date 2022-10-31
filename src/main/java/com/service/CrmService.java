package com.service;

import com.dao.CompanyDao;
import com.dao.CompanyMemberDao;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class CrmService {
    private final CompanyMemberDao companyMemberDao;
    private final CompanyDao companyDao;
}
