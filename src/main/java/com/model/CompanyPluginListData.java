package com.model;

import com.model.common.MFile;
import com.model.company.CompanyMemberListData;
import com.model.grant.PLUGIN_TYPE;
import lombok.Data;

import java.util.List;

@Data
public class CompanyPluginListData {
    private int plug_no;
    private int company_no;
    private String title;
    private String desc;
    private MFile profile_image;
    private PLUGIN_TYPE type;
    private List<CompanyMemberListData> teammates;
}
