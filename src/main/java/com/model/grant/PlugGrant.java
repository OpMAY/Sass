package com.model.grant;

import lombok.Data;

@Data
public class PlugGrant extends Grant {
    private PLUGIN_TYPE plugin;

    public PlugGrant() {
        super();
    }

    public PlugGrant(PLUGIN_TYPE plugin, int user_no, ROLE role, GRANT_TYPE type, boolean auth) {
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
