package com.config.socket;

import com.config.socket.plug.crm.CrmWebSocketHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.*;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

@Slf4j
@Configuration
@EnableWebSocket
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketConfigurer {
    private final CrmWebSocketHandler crmWebSocketHandler;
    private final WebSocketHandler webSocketHandler;
    private final HandShakeInterceptor handShakeInterceptor;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(webSocketHandler, "socket")
                .addHandler(crmWebSocketHandler, "socket/crm")
                .setAllowedOrigins("**")
                .addInterceptors(handShakeInterceptor);
    }

//    @Override
//    public void configureWebSocketTransport(WebSocketTransportRegistration registry) {
//        registry.setDecoratorFactories(new AgentWebSocketHandlerDecoratorFactory());
//        registry.setSendTimeLimit(100 * 10000);
//        registry.setSendBufferSizeLimit(100 * 1024 * 1024);
//    }
//    @Override
//    public void configureMessageBroker(final MessageBrokerRegistry registry) {
//        long[] heartbeat = {10000L, 10000L};
//        // TODO ADD BROKER, SET HEARTBEAT
////        registry.enableSimpleBroker("/sub")
////                .setHeartbeatValue(heartbeat)
////                .setTaskScheduler(heartBeatScheduler());
////        registry.setApplicationDestinationPrefixes("/pub");
//    }

    // heart beat: 연결 확인 지속적으로 하는 것
//    @Bean
//    public TaskScheduler heartBeatScheduler() {
//        return new ThreadPoolTaskScheduler();
//    }
}
