package com.model.company;

import com.model.grant.ROLE;
import lombok.Data;

@Data
public class CompanyMember {
    private int no;
    private int user_no;
    private int company_no;
    private ROLE role;
    private boolean edit_auth;
    private boolean read_auth;
    private String request_date;
    private String reg_datetime;
    private String revise_date;
}
