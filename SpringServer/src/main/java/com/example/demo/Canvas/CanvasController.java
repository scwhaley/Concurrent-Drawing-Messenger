package com.example.demo.Canvas;

import java.security.Principal;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;


@Controller
public class CanvasController {
    
    @MessageMapping("/message")
    @SendToUser("/topic/test")
    public String processMessageFromClient(@Payload String message, Principal principal){
        String name = message;
        return name;
    }
}
