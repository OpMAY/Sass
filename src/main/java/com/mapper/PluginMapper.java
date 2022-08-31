package com.mapper;

import com.model.Plugin;
import com.model.grant.PLUGIN_TYPE;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

public interface PluginMapper {
    ArrayList<Plugin> getPlugs();

    Plugin getPlug(@Param("type") PLUGIN_TYPE type);
}
