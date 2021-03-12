package com.example.demo.LoginAndSignup;

import com.example.demo.DemoApplication;
import com.example.demo.UserInfo.ApplicationUser;
import com.example.demo.UserInfo.UserRepository;

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
    public ResponseEntity<String> Login(@RequestBody ApplicationUser userCreds){
        logger.info("Proivded username is " + userCreds.getUsername());
        logger.info("Proivded PW is " + userCreds.getPassword());
        //Find user with the provided username
        ApplicationUser user = userRepository.findByUsername(userCreds.getUsername());

        if(user == null){
            logger.info("No user found with the username: " + userCreds.getUsername());
            return new ResponseEntity<String>("Invalid Credentials", null, HttpStatus.UNAUTHORIZED);
        }

        if(!user.isEnabled()){
            logger.info(userCreds.getUsername() + " is not enabled.");
            return new ResponseEntity<String>("This account is disabled.", null, HttpStatus.UNAUTHORIZED);
        }
        
        //Verify that the passwords match
        boolean passwordMatch = user.getPassword() == encoder.encode(userCreds.getPassword());

        if(!passwordMatch){
            logger.info("Password did not match " + userCreds.getUsername());
            return new ResponseEntity<String>("Invalid Credentials", null, HttpStatus.UNAUTHORIZED);
        }

        //Successful login
        String token = authService.createJWT(user);

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("Authorization", token);

        return new ResponseEntity<String>("Successful login", responseHeaders, HttpStatus.OK);
    }
}
