package com.binarystudio.academy.slidez.infrastructure.ws;

import com.binarystudio.academy.slidez.infrastructure.security.AllowedOriginProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

	private final AllowedOriginProperties allowedOriginProperties;

	@Autowired
	public WebSocketConfig(AllowedOriginProperties allowedOriginProperties) {
		this.allowedOriginProperties = allowedOriginProperties;
	}

	@Override
	public void configureMessageBroker(MessageBrokerRegistry config) {
		config.enableSimpleBroker("/topic");
		config.setApplicationDestinationPrefixes("/slidez");
	}

	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		registry.addEndpoint("/ws").setAllowedOrigins(allowedOriginProperties.getAllowedOrigins()).withSockJS();
	}

}
