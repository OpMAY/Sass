package com.model.grant;

import lombok.Data;

@Data
public class TeamGrant extends Grant {
    public TeamGrant() {
        super();
    }

    public TeamGrant(int user_no, ROLE role, GRANT_TYPE type, boolean auth) {
        super.setAuth(auth);
        super.setRole(role);
        super.setType(type);
        super.setUser_no(user_no);
    }

    @Override
    public String toString() {
        return "TeamGrant{" + super.toString() + "}";
    }
}
