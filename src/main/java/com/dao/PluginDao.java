package com.dao;

import com.mapper.PluginMapper;
import com.model.Plugin;
import com.model.grant.PLUGIN_TYPE;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Slf4j
@Repository
public class PluginDao {
    private final PluginMapper mapper;

    public PluginDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(PluginMapper.class);
    }

    public ArrayList<Plugin> getPlugs() {
        return mapper.getPlugs();
    }

    public Plugin getPlug(PLUGIN_TYPE type) {
        return mapper.getPlug(type);
    }
}
