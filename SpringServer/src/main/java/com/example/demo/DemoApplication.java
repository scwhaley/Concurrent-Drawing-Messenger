package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.context.event.ContextClosedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Properties;

import com.example.demo.Canvas.CanvasConsumerThreadMap;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.Producer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@SpringBootApplication
public class DemoApplication {

	private static final Logger logger = LoggerFactory.getLogger(DemoApplication.class);
	@Autowired
	private CanvasConsumerThreadMap canvasConsumerThreadMap;

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Bean
    public BCryptPasswordEncoder getPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }

	@Bean
	public Producer<String, String> getProducer(){
		Properties props = new Properties();
		props.setProperty("bootstrap.servers", "192.168.56.101:29092");
		props.setProperty("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
		props.setProperty("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");
		props.setProperty("acks", "all");

		Producer<String, String> producer = new KafkaProducer<>(props);
		return producer;
	}
	
	@Bean
	public CommandLineRunner test(){
		return (args) -> {
			logger.info("Server started");
		};
	}

	@EventListener
	public void handleApplicationShutdown(ContextClosedEvent event){
		//Make sure that all of the canvasConsumer threads are cleaned up on application shutdown
		canvasConsumerThreadMap.deleteAllThreads();
	}
}