package com.model.ws.crm;

import com.model.ws.SocketSessionModel;
import lombok.Data;

@Data
public class CrmSocketSessionModel extends SocketSessionModel {
    private String hash;
    private int project_no;
}
