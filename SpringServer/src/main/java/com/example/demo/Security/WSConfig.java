package com.example.demo.Security;

import com.example.demo.DemoApplication;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

@Configuration
@EnableWebSocketMessageBroker
public class WSConfig implements WebSocketMessageBrokerConfigurer {

  private static final Logger logger = LoggerFactory.getLogger(DemoApplication.class);

  @Override
  public void configureMessageBroker(MessageBrokerRegistry config) {
    config.enableSimpleBroker("/topic");
    config.setApplicationDestinationPrefixes("/app");
  }

  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint("/greeting").setAllowedOrigins("http://localhost:3000").withSockJS();
  }

  @EventListener(SessionConnectEvent.class)
	public void handleWSConnectListener (SessionConnectEvent event){
		logger.info("Recieved WS Session Connect Event");
	}

	@EventListener(SessionSubscribeEvent.class)
	public void handleWSSubscribeListener (SessionSubscribeEvent event){
		StompHeaderAccessor headers = StompHeaderAccessor.wrap(event.getMessage());
		logger.info("Recieved WS Session Subscribe Event" + headers.getDestination());
	}

}