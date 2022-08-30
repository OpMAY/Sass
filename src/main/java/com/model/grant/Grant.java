package com.model.grant;

import lombok.Data;

@Data
public abstract class Grant {
    private int user_no;
    private ROLE role;
    private GRANT_TYPE type;
    private boolean auth;
}
