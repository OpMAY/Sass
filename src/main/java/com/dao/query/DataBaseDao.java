package com.dao.query;

import com.mapper.query.DataBaseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class DataBaseDao {
    private final DataBaseMapper mapper;
}
