package com.example.demo.Signup;

import com.example.demo.DemoApplication;
import com.example.demo.User;
import com.example.demo.UserRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SignupController {

    private Logger logger = LoggerFactory.getLogger(DemoApplication.class);
    
    @Autowired
    private UserRepository userRepo;

    @PostMapping("/api/public/signup")
    public void Signup(@RequestBody User newUser){
        logger.info("Adding new user with username = " + newUser.getUsername());
        newUser.setEnabled(true);

        //TODO: Add check if user with username already exists in table
        userRepo.save(newUser);
    }
}
