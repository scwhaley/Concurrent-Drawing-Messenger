package com.example.demo.Canvas;

import java.security.Principal;

import com.example.demo.DemoApplication;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Controller
public class CanvasController {
    
    private static final Logger logger = LoggerFactory.getLogger(DemoApplication.class);

    // @MessageMapping("/message/{room}")
    // public String processMessageFromClient(@Payload String payload, Principal principal, @DestinationVariable String room){
        
    //     logger.info(("Recieved message to app/message/" + room + ": " + payload));
    //     logger.info("Passing it through unchanged to topic/message/" + room);
    //     return payload;
    // }

}
