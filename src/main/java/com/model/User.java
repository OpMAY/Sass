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
    private UserAgreeData agree_data;
    private boolean marketing_agree;
    private String marketing_agree_date;
    private MFile profile_img;
    private boolean plugin_alarm;
    private boolean service_alarm;
    private String reg_datetime;
    private String last_login_date;

    // For Login Validation
    private int login_status;
}
