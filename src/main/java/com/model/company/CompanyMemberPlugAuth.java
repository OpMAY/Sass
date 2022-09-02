package com.model.company;

import lombok.Data;

@Data
public class CompanyMemberPlugAuth {
    private int member_no;
    private int company_no;
    private int plug_no;
    private boolean edit_auth;
    private boolean read_auth;
    private String reg_datetime;
    private String revise_date;
}
