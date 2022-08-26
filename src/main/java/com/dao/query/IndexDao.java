package com.dao.query;

import com.mapper.query.IndexMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class IndexDao {
    private final IndexMapper mapper;
}
