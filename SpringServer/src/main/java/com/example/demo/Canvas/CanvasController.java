package com.example.demo.Canvas;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;


@Controller
public class CanvasController {
    
    @Autowired
    private SimpMessagingTemplate template;

    @MessageMapping("/message")
    public void processMessageFromClient(@Payload String message, Principal principal){
        String name = message;
        this.template.convertAndSend("/topic/test", name);
    }
}
