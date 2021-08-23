package com.example.demo.Canvas;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class DemoStompKafkaPayload {
    public String topic;
    public String key;
    public String value;
    
    public DemoStompKafkaPayload(String topic, String key, String value){
        this.topic = topic;
        this.key = key;
        this.value = value;
    }

    public String getTopic() {
        return topic;
    }
    
    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getKey() {
        return key;
    }
    
    public void setKey(String key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }
    
    public void setValue(String value) {
        this.value = value;
    }

    public static String basicMessageAsJSONString(String topic, String key, String value) throws JsonProcessingException{
        DemoStompKafkaPayload basicMessage = new DemoStompKafkaPayload(topic, key, value);
        return new ObjectMapper().writeValueAsString(basicMessage);
    }
}
