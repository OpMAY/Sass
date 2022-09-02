package com.mapper;

import com.model.CompanyPluginListData;
import com.model.Plugin;
import com.model.grant.PLUGIN_TYPE;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;
import java.util.List;

public interface PluginMapper {
    ArrayList<Plugin> getPlugs();

    Plugin getPlug(@Param("type") PLUGIN_TYPE type);

    List<CompanyPluginListData> getCompanyPlugs(int companyNo);

    PLUGIN_TYPE getPlugType(int plugNo);
}
