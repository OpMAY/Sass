package com.model.ws.chat;

import com.model.chat.chatmessage.ChatMessage;
import com.model.ws.WebSocketSimpleDataObject;
import lombok.Data;

@Data
public class ChatWebSocketDataObject extends WebSocketSimpleDataObject {
    private CHAT_CATEGORY category;
    private CHAT_SUBCATEGORY subcategory;
    private CHAT_THIRDCATEGORY thirdcategory;
    private CHAT_TARGET target;
}
