package com.example.demo.Canvas;

import java.util.Map;

import com.example.demo.DemoApplication;
import com.example.demo.Utils.BasicMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.interfaces.Claim;

import com.fasterxml.jackson.core.JsonProcessingException;

@RestController
public class CanvasSubscriptionsController{
    
    private Logger logger = LoggerFactory.getLogger(DemoApplication.class);
    
    @GetMapping("api/secured/subscriptions")
    public ResponseEntity<String> getCanvasSubscriptions() throws JsonProcessingException {
        Authentication x = SecurityContextHolder.getContext().getAuthentication();

        //The auth details object is populated in the JWTAuthorizationFilter. It populates the details object with a Map<String,Claim> object
        //that represents all the claims in the JWT. Since spring security only lets us retrive the details as type Object, we must cast the details
        //object in order to make it useable.
        @SuppressWarnings("unchecked")
        Map<String,Claim> authDetails = (Map<String, Claim>) x.getDetails();

        logger.info(authDetails.get("user_id").asInt().toString());

        return new ResponseEntity<String>(BasicMessage.basicMessageAsJSONString("canvas subscriptions"), null, HttpStatus.OK);    
    }
}
