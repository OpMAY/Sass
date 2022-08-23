package com.dao.query;

import com.mapper.query.RelationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class RelationDao {
    private final RelationMapper relationMapper;
}
