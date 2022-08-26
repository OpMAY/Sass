package com.dao.query;

import com.mapper.query.QueryPlugMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class QueryPlugDao {
    private final QueryPlugMapper mapper;
}
