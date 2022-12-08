package com.controller.socket.crm;

import com.model.ws.crm.CrmWebSocketObject;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@MessageMapping("/socket/crm")
@Controller
@Slf4j
@RequiredArgsConstructor
public class CrmWebSocketController {

    @MessageMapping("/send")
    public void send(@Payload CrmWebSocketObject message) {
        log.info("message : {}", message);
    }
}
