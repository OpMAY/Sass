package com.model.company;

import com.model.grant.ROLE;
import lombok.Data;

@Data
public class CompanyMemberListData {
    private int user_no;
    private int company_no;
    private String name;
    private String email;
    private ROLE role;
    private boolean edit_auth;
    private boolean read_auth;
}
