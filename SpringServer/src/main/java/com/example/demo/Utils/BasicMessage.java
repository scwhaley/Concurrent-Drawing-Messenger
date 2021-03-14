package com.example.demo.Utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class BasicMessage {
    public String message;

    public BasicMessage(String message){
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }

    public static String basicMessageAsJSONString(String message) throws JsonProcessingException{
        BasicMessage basicMessage = new BasicMessage(message);
        return new ObjectMapper().writeValueAsString(basicMessage);
    }
}