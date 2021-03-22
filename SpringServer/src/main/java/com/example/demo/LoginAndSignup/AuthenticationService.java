package com.example.demo.LoginAndSignup;

import java.util.Date;

import com.auth0.jwt.JWT;
import static com.auth0.jwt.algorithms.Algorithm.HMAC512;

import com.example.demo.DemoApplication;
import com.example.demo.UserInfo.ApplicationUser;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private Logger logger = LoggerFactory.getLogger(DemoApplication.class);

    public String createJWT(ApplicationUser user){
        logger.info("Creating JWT");
        

        // User the Auth0 library to create a JWT
        String token = JWT.create().withSubject(user.getUsername())
                                    .withExpiresAt( new Date(System.currentTimeMillis()+(long)300000))
                                    .withClaim("user_id", user.getUser_id())
                                    .sign(HMAC512("SecretKeyToGenerateJWTs"));

        logger.info("Token is :" + token);
        return token;
    }

}
