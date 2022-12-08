package com.config.socket;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

@Slf4j
@RequiredArgsConstructor
@Component
public class HandShakeInterceptor extends HttpSessionHandshakeInterceptor {
}
