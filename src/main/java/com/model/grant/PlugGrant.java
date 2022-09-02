package com.model.grant;

import lombok.Data;

@Data
public class PlugGrant extends Grant {
    private PLUGIN_TYPE plugin;
    private int member_no;
    private int plug_no;

    public PlugGrant() {
        super();
    }

    public PlugGrant(PLUGIN_TYPE plugin, int member_no, int plug_no, int user_no, ROLE role, GRANT_TYPE type, boolean auth) {
        this.plugin = plugin;
        this.member_no = member_no;
        this.plug_no = plug_no;
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
