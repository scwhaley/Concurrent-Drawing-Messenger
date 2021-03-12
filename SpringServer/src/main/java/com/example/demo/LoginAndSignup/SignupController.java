package com.example.demo.LoginAndSignup;

import com.example.demo.DemoApplication;
import com.example.demo.Greeting.Greeting;
import com.example.demo.UserInfo.ApplicationUser;
import com.example.demo.UserInfo.UserRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class SignupController {

    private Logger logger = LoggerFactory.getLogger(DemoApplication.class);
    
	@Autowired
	private BCryptPasswordEncoder encoder;
    
    @Autowired
    private UserRepository userRepo;

    @PostMapping("/api/public/signup")
    public Greeting Signup(@RequestBody ApplicationUser newUser) {
        logger.info("Adding new user with username = " + newUser.getUsername());
        newUser.setEnabled(true);
        
        
        ApplicationUser existingUser = userRepo.findByUsername(newUser.getUsername());

        //If username already exists
        if ( existingUser != null){
            logger.info("User already exists with the username: " + existingUser.getUsername());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username already exists");
        }

        //If username is valid
        //Salt and hash the plaintext password
        newUser.setPassword(encoder.encode(newUser.getPassword()));

        //Save the new user
        userRepo.save(newUser);

        var obj = new Greeting(0, "test");

        return obj;
    }
}
