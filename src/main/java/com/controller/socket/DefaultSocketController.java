package com.controller.socket;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@MessageMapping("/socket")
@Slf4j
@Controller
@RequiredArgsConstructor
public class DefaultSocketController {

}
