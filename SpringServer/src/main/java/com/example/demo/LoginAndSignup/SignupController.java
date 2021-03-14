package com.example.demo.LoginAndSignup;

import com.example.demo.DemoApplication;
import com.example.demo.UserInfo.ApplicationUser;
import com.example.demo.UserInfo.UserRepository;
import com.example.demo.Utils.BasicMessage;
import com.fasterxml.jackson.core.JsonProcessingException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SignupController {

    private Logger logger = LoggerFactory.getLogger(DemoApplication.class);
    
	@Autowired
	private BCryptPasswordEncoder encoder;
    
    @Autowired
    private UserRepository userRepo;

    @PostMapping("/api/public/signup")
    public ResponseEntity<String> Signup(@RequestBody ApplicationUser newUser) throws JsonProcessingException {

        logger.info("Attempting account creation with username = " + newUser.getUsername() + " and password: " + newUser.getPassword());

        newUser.setEnabled(true);
        
        ApplicationUser existingUser = userRepo.findByUsername(newUser.getUsername());

        //Check if username already exists
        if (existingUser != null){
            logger.info("User already exists with the username: " + existingUser.getUsername());
            return new ResponseEntity<String>(BasicMessage.basicMessageAsJSONString("Username already exists"), null, HttpStatus.BAD_REQUEST);    
        }

        //Salt and hash the plaintext password
        newUser.setPassword(encoder.encode(newUser.getPassword()));

        //Persist the new user to the DB
        userRepo.save(newUser);
        logger.info("Created account for username: " + newUser.getUsername());

        return new ResponseEntity<String>(BasicMessage.basicMessageAsJSONString("Account successfully created."), null, HttpStatus.OK);
    }
}
