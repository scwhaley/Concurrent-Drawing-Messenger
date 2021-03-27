package com.example.demo.Security;

import com.example.demo.Utils.BasicMessage;
import com.fasterxml.jackson.core.JsonProcessingException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthorizationCheckController {

    //This endpoint is a convienience endpoint that is secured. The requst must go through the AuthorizationFilter first, so if succesful
    //then you know that the user has a valid JWT. This is useful for checking privleges in the client app.
    @GetMapping("/api/secured/auth-check")
    public ResponseEntity<String> checkAuth() throws JsonProcessingException {
        return new ResponseEntity<String>(BasicMessage.basicMessageAsJSONString("JWT is valid"), null, HttpStatus.OK);
    }
}
