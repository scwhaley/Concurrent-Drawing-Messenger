package com.example.demo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@SpringBootApplication
public class DemoApplication {

	private static final Logger logger = LoggerFactory.getLogger(DemoApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
		logger.info("Test");
	}

	// This method allows the React application (which sends requests from
	// http://localhost:3000)
	// to send HTTP requests to the Spring server API (which is on
	// http://localhost:8080)
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("http://localhost:3000");
			};
		};
	}

	@Bean
	public CommandLineRunner test(UserRepository repo){
		return (args) -> {
			logger.info("test2");
			Optional<User> testFindUser = repo.findById(1);
			logger.info(testFindUser.get().getUsername());
		};
		
	}


}