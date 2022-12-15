package com.model.ws.chat;

import com.model.ws.SocketSessionModel;
import lombok.Data;

@Data
public class ChatChannelSocketSessionModel extends SocketSessionModel {
    private String hash;
    private int channel_no;
}
