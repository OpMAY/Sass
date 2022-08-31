package com.model;

import com.model.common.MFile;
import com.model.jwt.RootUser;
import lombok.Data;

@Data
public class User extends RootUser {
    private String name;
    private String phone;
    private String password;
    private UserAgreeData agree_data;
    private boolean marketing_agree;
    private String marketing_agree_date;
    private MFile profile_img;
    private boolean plugin_alarm;
    private boolean service_alarm;
    private String last_login_date;

    // For Login Validation
    private int login_status;
}
