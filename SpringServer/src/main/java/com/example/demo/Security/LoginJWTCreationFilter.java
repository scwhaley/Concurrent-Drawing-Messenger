package com.example.demo.Security;

import java.io.IOException;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.auth0.jwt.JWT;
import com.fasterxml.jackson.databind.ObjectMapper;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class LoginJWTCreationFilter extends UsernamePasswordAuthenticationFilter{

    private AuthenticationManager authManager;

    public LoginJWTCreationFilter(AuthenticationManager authManager){
        this.authManager = authManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, 
                                                HttpServletResponse response) throws AuthenticationException{
        try{
            //Extract user credentials for the HTTP request by mapping the request body into a User object
            User userCreds = new ObjectMapper().readValue(request.getInputStream(), User.class);

            // Create an authentication token from the username and password. Give to the Authentication Manager to authenticate with.        
            return authManager.authenticate(new UsernamePasswordAuthenticationToken(userCreds.getUsername(), userCreds.getPassword()));
        }
        catch(IOException e){
            throw new RuntimeException(e);
        }
    }
    @Override    
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication auth){

        // User the Auth0 library to create a JWT
        String token = JWT.create().withSubject( ((User) auth.getPrincipal()).getUsername())
                                    .withExpiresAt( new Date(System.currentTimeMillis()+(long)300000))
                                    .sign(HMAC512("SecretKeyToGenerateJWTs"));

        //Add the JWT to the response back to the client
        response.addHeader("Authorization", token);
    }
    
}