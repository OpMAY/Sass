package com.model.ws;

import com.model.User;
import com.model.grant.PLUGIN_TYPE;
import lombok.Data;

@Data
public abstract class WebSocketSimpleObject {
    private PLUGIN_TYPE plugin_type; // PLUGIN_TYPE
    private int user_no; // WHO no
    private User user; // WHO model
}
