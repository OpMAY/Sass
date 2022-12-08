package com.model.ws.crm;

import com.model.ws.WebSocketSimpleObject;
import lombok.Data;

@Data
public class CrmWebSocketObject extends WebSocketSimpleObject {
    private CRM_ACTION_TYPE_SAMPLE action_type;
}
