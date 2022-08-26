package com.dao;

import com.mapper.CompanyPlugMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class CompanyPlugDao {
    private final CompanyPlugMapper mapper;
}
