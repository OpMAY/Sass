package com.model.ws.crm;

import com.model.ws.WebSocketSimpleDataObject;
import lombok.Data;

@Data
public class CrmWebSocketDataObject extends WebSocketSimpleDataObject {
    private CRM_CATEGORY_SAMPLE category;
    private CRM_SUBCATEGORY_SAMPLE subcategory;
}
