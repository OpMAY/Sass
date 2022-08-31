package com.api.mail;

import lombok.Data;

@Data
public class MailFooter {
    private String companyEngName;
    private String companyName;
    private String representativeName;
    private String businessNumber;
    private String companyAddress;

    public MailFooter() {

    }

    public MailFooter(String companyEngName, String companyName, String representativeName, String businessNumber, String companyAddress) {
        this.companyEngName = companyEngName;
        this.companyName = companyName;
        this.representativeName = representativeName;
        this.businessNumber = businessNumber;
        this.companyAddress = companyAddress;
    }
}
