package com.dao.query;

import com.mapper.query.ColumnMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ColumnDao {
    private final ColumnMapper mapper;
}
