package com.dao.query;

import com.mapper.query.TableMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class TableDao {
    private final TableMapper mapper;
}
