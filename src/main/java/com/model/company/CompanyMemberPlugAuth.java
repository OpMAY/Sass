package com.model.company;

import lombok.Data;

@Data
public class CompanyMemberPlugAuth {
    private int userNo;
    private int companyNo;
    private String plugNo;
    private boolean editAuth;
    private boolean readAuth;
    private String createDate;
    private String reviseDate;
}
