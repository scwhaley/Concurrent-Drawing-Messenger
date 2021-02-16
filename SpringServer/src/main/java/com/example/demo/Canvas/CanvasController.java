package com.example.demo.Canvas;

import java.security.Principal;

import com.example.demo.DemoApplication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Controller
public class CanvasController {
    
    @Autowired
    private SimpMessagingTemplate template;
    private static final Logger logger = LoggerFactory.getLogger(DemoApplication.class);

    @MessageMapping("/message/{room}")
    public void processMessageFromClient(@Payload String message, Principal principal, @DestinationVariable String room){
        
        //logger.info(("Recieved message from " + "app/message/" + room));
        String name = message;
        String dest = "/topic/test/" + room;
        //logger.info("Sending response to " + dest);
        this.template.convertAndSend(dest, name);
    }

    @SubscribeMapping("/test/{room}")
    public void processSubscriptionFromClient(@DestinationVariable String room, Principal principal){
        logger.info("Recieved subscription");

        Message syncMessage = new Message();
        syncMessage.setType("Sync");
        syncMessage.setContent("");
        
        String dest = "/topic/test/" + room;

        this.template.convertAndSend(dest, syncMessage);
    }
}
