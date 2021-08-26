package com.example.demo.Canvas;

import java.time.Duration;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicBoolean;

import javax.swing.GroupLayout.Group;

import com.example.demo.DemoApplication;

import org.apache.kafka.clients.consumer.*;
import org.apache.kafka.common.errors.WakeupException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.simp.SimpMessagingTemplate;

public class CanvasConsumerRunner implements Runnable{
    
    private Logger logger = LoggerFactory.getLogger(DemoApplication.class);

    private Consumer<String, String> consumer;
    private final AtomicBoolean closed = new AtomicBoolean(false);
    private SimpMessagingTemplate simpMessagingTemplate;
    private String stompClientTopic;

    public CanvasConsumerRunner(SimpMessagingTemplate simp, String stompClientTopic){
        this.simpMessagingTemplate = simp;
        this.stompClientTopic = stompClientTopic;

        UUID groupId = UUID.randomUUID();
        UUID clientId = UUID.randomUUID();
        Properties props = new Properties();
		props.setProperty("bootstrap.servers", "192.168.56.101:29092");
        props.setProperty("group.id", groupId.toString());
        props.setProperty("client.id", clientId.toString());
        props.setProperty("enable.auto.commit", "true");
        props.setProperty("auto.commit.interval.ms", "1000");
		props.setProperty("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
		props.setProperty("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
		props.setProperty("auto.offset.reset", "earliest");
        this.consumer = new KafkaConsumer<String,String>(props);   
        logger.info("Thread ID: " + Thread.currentThread().getId() + " Message: Created new Consumer in constructor");
    }

    @Override
    public void run(){
        try {
            consumer.subscribe(Arrays.asList("foo"));
            while (!closed.get()) {
                //Poll for new records
                ConsumerRecords<String,String> allNewRecords = consumer.poll(Duration.ZERO);
                if(!allNewRecords.isEmpty()){
                    //For each new record in the topic "foo", send to a STOMP topic for client to recieve
                    allNewRecords.records("foo").forEach(record -> sendToClient(record));
                    //allNewRecords.records("foo").forEach(r -> logger.info("Key: " + r.key() + " Value: " + r.value()));
                }
                //Allow time for other threads to work
                Thread.sleep(20);
            }
        } catch (WakeupException e) {
            // Ignore exception if closing
            if (!closed.get()) throw e;
        } catch (InterruptedException e){
            //Ignore for now
        } finally {
            consumer.close();
            logger.info("Thread ID: " + Thread.currentThread().getId() + " Message: Closing thread");
        }
    }

    private void sendToClient(ConsumerRecord<String, String> record){
        logger.info(System.currentTimeMillis() + ": key = " + record.key() + " consume");
        simpMessagingTemplate.convertAndSend("/topic/foo", new DemoStompKafkaPayload(record.topic(), record.key(), record.value()));
    }

    // Shutdown hook which can be called from a separate thread
    public void shutdown() {
        closed.set(true);
        consumer.wakeup();
    }
    
}
