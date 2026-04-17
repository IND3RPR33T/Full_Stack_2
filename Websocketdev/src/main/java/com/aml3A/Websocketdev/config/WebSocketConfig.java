package com.aml3A.Websocketdev.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // Messages will be routed to /topic/...
        config.enableSimpleBroker("/topic");
        // Client-to-server messages must be prefixed with /app
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                // Allow the React Vite dev server to connect
                .setAllowedOriginPatterns("http://localhost:5173", "http://localhost:*")
                .withSockJS()
                .setStreamBytesLimit(5 * 1024 * 1024)
                .setHttpMessageCacheSize(5 * 1024 * 1024);
    }

    @Override
    public void configureWebSocketTransport(org.springframework.web.socket.config.annotation.WebSocketTransportRegistration registration) {
        // Allow up to 2MB messages — needed for base64 voice recordings
        registration.setMessageSizeLimit(5 * 1024 * 1024);
        registration.setSendBufferSizeLimit(5 * 1024 * 1024);
        registration.setSendTimeLimit(20_000);
    }

    @org.springframework.context.annotation.Bean
    public org.springframework.web.socket.server.standard.ServletServerContainerFactoryBean createWebSocketContainer() {
        org.springframework.web.socket.server.standard.ServletServerContainerFactoryBean container = new org.springframework.web.socket.server.standard.ServletServerContainerFactoryBean();
        container.setMaxTextMessageBufferSize(5 * 1024 * 1024);
        container.setMaxBinaryMessageBufferSize(5 * 1024 * 1024);
        return container;
    }
}
