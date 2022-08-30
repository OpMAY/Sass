package com.model.grant;

import lombok.Data;

@Data
public class PlugGrant extends Grant {
    private PLUGIN plugin;

    public PlugGrant() {
        super();
    }

    public PlugGrant(PLUGIN plugin, int user_no, ROLE role, GRANT_TYPE type, boolean auth) {
        this.plugin = plugin;
        super.setAuth(auth);
        super.setRole(role);
        super.setType(type);
        super.setUser_no(user_no);
    }

    @Override
    public String toString() {
        return "PlugGrant{" + "plugin=" + this.plugin + ", " + super.toString() + "}";
    }
}
