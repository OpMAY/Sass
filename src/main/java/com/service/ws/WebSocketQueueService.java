package com.service.ws;

import com.model.ws.crm.CrmSocketSessionModel;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.CloseStatus;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;

@Slf4j
@Service
@RequiredArgsConstructor
public class WebSocketQueueService {
    private final LinkedHashMap<String, CrmSocketSessionModel> crmSessionQueue;

    public void CrmSessionQueueScheduler() throws IOException {
        for(CrmSocketSessionModel crmSocketSessionModel : crmSessionQueue.values()) {
            if(crmSocketSessionModel.getExpired_datetime().isBefore(LocalDateTime.now())) {
                crmSocketSessionModel.getWebSocketSession().close(CloseStatus.REQUIRED_EXTENSION);
            }
        }
    }
}
