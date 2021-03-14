package com.example.demo.LoginAndSignup;

import com.example.demo.DemoApplication;
import com.example.demo.UserInfo.ApplicationUser;
import com.example.demo.UserInfo.UserRepository;
import com.example.demo.Utils.BasicMessage;
import com.fasterxml.jackson.core.JsonProcessingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    private Logger logger = LoggerFactory.getLogger(DemoApplication.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationService authService;

    @Autowired
	private BCryptPasswordEncoder encoder;

    @PostMapping("/api/public/login")
    public ResponseEntity<String> Login(@RequestBody ApplicationUser userCreds) throws JsonProcessingException{

        logger.info("Login request made with username: " + userCreds.getUsername() + " and password: " + userCreds.getPassword())
        ;
        //Find user with the provided username
        ApplicationUser user = userRepository.findByUsername(userCreds.getUsername());

        //Verify that username exists
        if(user == null){
            logger.info("No user found with the username: " + userCreds.getUsername());
            return new ResponseEntity<String>(BasicMessage.basicMessageAsJSONString("Invalid Credentials"), null, HttpStatus.UNAUTHORIZED);
        }

        encoder.matches(userCreds.getPassword(), user.getPassword());

        //Verify that the passwords match
        boolean passwordMatch = encoder.matches(userCreds.getPassword(), user.getPassword());

        if(!passwordMatch){
            logger.info("Password did not match " + userCreds.getUsername());
            return new ResponseEntity<String>(BasicMessage.basicMessageAsJSONString("Invalid Credentials"), null, HttpStatus.UNAUTHORIZED);
        }

        //Verify the account is enables
        if(!user.isEnabled()){
            logger.info(userCreds.getUsername() + " is not enabled.");
            return new ResponseEntity<String>(BasicMessage.basicMessageAsJSONString("This account is disabled"), null, HttpStatus.UNAUTHORIZED);
        }
                
        //Successful login
        logger.info("Sucessful login");
        String token = authService.createJWT(user);
        logger.info("Created and sent JWT on Authorization header");

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("Authorization", token);

        return new ResponseEntity<String>(BasicMessage.basicMessageAsJSONString("Successful login"), responseHeaders, HttpStatus.OK);

    }
}
