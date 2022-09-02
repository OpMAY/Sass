package com.model.jwt;

import com.model.common.Time;
import com.model.grant.PlugGrant;
import com.model.grant.TeamGrant;
import lombok.Data;

@Data
public abstract class RootUser extends Time {
    private String version;
    private String access_token;
    private String email;
    private int no;
    private boolean is_company = false;
}
