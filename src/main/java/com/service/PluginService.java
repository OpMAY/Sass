package com.service;

import com.dao.PluginDao;
import com.model.Plugin;
import com.model.grant.PLUGIN_TYPE;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@Slf4j
@RequiredArgsConstructor
public class PluginService {
    private final PluginDao pluginDao;

    public ArrayList<Plugin> getPlugs() {
        return pluginDao.getPlugs();
    }

    public Plugin getPlug(PLUGIN_TYPE type) {
        return pluginDao.getPlug(type);
    }
}
