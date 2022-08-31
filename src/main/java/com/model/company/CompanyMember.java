package com.model.company;

import lombok.Data;

@Data
public class CompanyMember {
    private int user_no;
    private int company_no;
    private CompanyRole role;
    private boolean edit_auth;
    private boolean read_auth;
    private String request_date;
    private String reg_datetime;
    private String revise_date;
}
