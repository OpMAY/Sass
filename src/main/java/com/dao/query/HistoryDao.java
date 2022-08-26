package com.dao.query;

import com.mapper.query.HistoryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class HistoryDao {
    private final HistoryMapper mapper;
}
