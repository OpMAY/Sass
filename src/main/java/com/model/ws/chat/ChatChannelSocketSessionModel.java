package com.model.ws.chat;

import com.model.ws.SocketSessionModel;
import lombok.Data;

import java.util.ArrayList;

@Data
public class ChatChannelSocketSessionModel extends SocketSessionModel {
    private String hash;
    private int channel_no;
    private ArrayList<Integer> channels;
}
