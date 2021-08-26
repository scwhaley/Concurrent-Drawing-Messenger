package com.example.demo.Canvas;

import java.security.Principal;

import com.example.demo.DemoApplication;
import com.fasterxml.jackson.core.JsonProcessingException;

import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

@Controller
public class DemoSTOMPController {
    
    private static final Logger logger = LoggerFactory.getLogger(DemoApplication.class);

    private final Producer<String, String> producer;

    @Autowired
    public DemoSTOMPController(Producer<String, String> producer){
        this.producer = producer;
    }

    @MessageMapping("/test")
    public void processMessageFromClient(@Payload DemoStompKafkaPayload message, Principal principal) throws JsonProcessingException{
        
        logger.info(System.currentTimeMillis() + ": Key = " + message.key + " produce");
        
        ProducerRecord<String, String> record = new ProducerRecord<String,String>(message.topic, message.key, message.value);
        producer.send(record);
        }
}
