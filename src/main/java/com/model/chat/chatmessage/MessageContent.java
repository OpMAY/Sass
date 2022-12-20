package com.model.chat.chatmessage;

import com.model.common.MFile;
import lombok.Data;

import java.util.ArrayList;

@Data
public class MessageContent {
    private ArrayList<MFile> files;
}
