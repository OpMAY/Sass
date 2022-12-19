package com.service.chat;

import com.model.ws.chat.ChatChannelSocketSessionModel;
import com.model.ws.chat.ChatSocketSessionModel;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatOnlineService {
    private final LinkedHashMap<String, ChatSocketSessionModel> chatSessionQueue;
    private final LinkedHashMap<String, ChatChannelSocketSessionModel> chatChannelSessionQueue;

    public boolean isUserOnline(int user_no) {
        boolean check = false;
        for(ChatSocketSessionModel chatSocketSessionModel : chatSessionQueue.values()) {
            if(chatSocketSessionModel.getUser_no() == user_no) {
                check = true;
                break;
            }
        }
        return check;
    }
}
