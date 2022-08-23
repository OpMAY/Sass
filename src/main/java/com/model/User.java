package com.model;

import com.model.common.MFile;
import lombok.Data;

@Data
public class User {
    private int no;
    private String name;
    private String email;
    private String phone;
    private String password;
    private UserAgreeData agreeData;
    private boolean marketingAgree;
    private String marketingAgreeDate;
    private MFile profileImg;
    private boolean pluginAlarm;
    private boolean serviceAlarm;
    private String createDate;
    private String lastLoginDate;
}
