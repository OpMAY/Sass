package com.model.ws.chat;

import com.model.ws.WebSocketSimpleObject;
import lombok.Data;

@Data
public class ChatWebSocketObject extends WebSocketSimpleObject {
    private CHAT_ACTION_TYPE action_type;
    private CHAT_CATEGORY category;
    private CHAT_SUBCATEGORY subcategory;
    private CHAT_THIRDCATEGORY thirdcategory;
    private CHAT_TARGET target;
}
