package com.example.demo.Security;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.demo.DemoApplication;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {
    
    private static final Logger logger = LoggerFactory.getLogger(DemoApplication.class);
    
    public JWTAuthorizationFilter(AuthenticationManager authManager){
        super(authManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException{
        //Get the Authorization header. We will use it to determine if we should filter this request
        String header = request.getHeader("Authorization");

        //If the header isn't right, send to the next filter without an authentication token
        if ((header == null) || (!header.startsWith("Bearer "))){
            chain.doFilter(request, response);
            return;
        }

        //Else get an authentication token and send to the next filter

        UsernamePasswordAuthenticationToken authentication = getAuthentication(request);

        

        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(request, response);
    }

    //This method is used to validate the JWT. If all is good, it returns an authentication token
    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request){
        String token = request.getHeader("Authorization");

        if (token == null){
            return null;
        }

        //Verifies the supplied token and extract the user from the subject (sub) field.
        // Note we must strip off the "Bearer " prefix.
        DecodedJWT decodedJWT = JWT.require(Algorithm.HMAC512("SecretKeyToGenerateJWTs"))
                                    .build()
                                    .verify(token.replace("Bearer ", ""));

        String user = decodedJWT.getSubject();


        if (user == null){
            return null;
        }

        logger.info("Successful JWT validation");
        
        //Create the authentication token with the supplied user.
        // Note that there are no credentials or roles at this point since they are not included
        // in the JWT.
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
        authentication.setDetails(decodedJWT.getClaims());

        return authentication;

    }
}
