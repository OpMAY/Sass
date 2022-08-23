package com.model;

import lombok.Data;

@Data
public class UserAgreeData {
    private boolean serviceAgree;
    private boolean personalInfoAgree;
    private boolean thirdPartyAgree;
    private String agreeDate;
}
