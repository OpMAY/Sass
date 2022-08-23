package com.model.company;

import lombok.Data;

@Data
public class CompanyMember {
    private int userNo;
    private int companyNo;
    private CompanyRole role;
    private boolean editAuth;
    private boolean readAuth;
    private String requestDate;
    private String createDate;
    private String reviseDate;
}
