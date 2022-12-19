package com.model.ws.chat;

import com.model.ws.SocketSessionModel;
import lombok.Data;

@Data
public class ChatSocketSessionModel extends SocketSessionModel {
    private String hash;
    private int company_no;
}
