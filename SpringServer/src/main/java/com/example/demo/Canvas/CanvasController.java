package com.example.demo.Canvas;

import java.util.List;
import java.util.Map;

import com.example.demo.DemoApplication;
import com.example.demo.Canvas.Canvas.Canvas;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.interfaces.Claim;

import com.fasterxml.jackson.core.JsonProcessingException;

@RestController
public class CanvasController{
    
    private Logger logger = LoggerFactory.getLogger(DemoApplication.class);

    @Autowired
    private SimpMessagingTemplate simp; 

    @Autowired
    private CanvasService canvasService;

    @Autowired
    private CanvasConsumerThreadMap threadMap;
    
    @GetMapping("api/secured/subscribed-canvas")
    public ResponseEntity<List<Canvas>> getSubscribedCanvases() throws JsonProcessingException {
        
        //The auth details object is populated in the JWTAuthorizationFilter. It populates the details object with a Map<String,Claim> object
        //that represents all the claims in the JWT. Since spring security only lets us retrive the details as type Object, we must cast the details
        //object in order to make it useable.
        Authentication x = SecurityContextHolder.getContext().getAuthentication();
        @SuppressWarnings("unchecked")
        Map<String,Claim> authDetails = (Map<String, Claim>) x.getDetails();
        Integer userID = authDetails.get("user_id").asInt();
        logger.info(userID.toString());

        List<Canvas> subscribedCanvases = canvasService.getSubscribedCanvasesByUserId(userID);
        
        return new ResponseEntity<List<Canvas>>(subscribedCanvases, null, HttpStatus.OK);    
    }

    @PostMapping("api/secured/canvas")
    public ResponseEntity<Canvas> createCanvas(@RequestBody String canvasName) throws JsonProcessingException {

        //The auth details object is populated in the JWTAuthorizationFilter. It populates the details object with a Map<String,Claim> object
        //that represents all the claims in the JWT. Since spring security only lets us retrive the details as type Object, we must cast the details
        //object in order to make it useable.
        Authentication x = SecurityContextHolder.getContext().getAuthentication();
        @SuppressWarnings("unchecked")
        Map<String,Claim> authDetails = (Map<String, Claim>) x.getDetails();
        Integer userID = authDetails.get("user_id").asInt();
        logger.info(userID.toString());

        
        logger.info("Recieved createCanvas POST request for canvasName = " + canvasName);
        Canvas createdCanvas = canvasService.createAndSubscribeToCanvas(canvasName, userID);

        logger.info("Created CanvasID = " + createdCanvas.getCanvasID());

        return new ResponseEntity<Canvas>(createdCanvas, null, HttpStatus.ACCEPTED);
    }

    @GetMapping("api/secured/canvas/active-users")
    public ResponseEntity<Integer> getCanvasActiveUserCount(@RequestParam Integer canvasID){
        Integer numActiveUsers = canvasService.getNumberOfActiveUsers(canvasID);
        logger.info("There are " + numActiveUsers + " in canvasID = " + canvasID);

        return new ResponseEntity<Integer>(numActiveUsers, null, HttpStatus.OK);
    }

    @PostMapping("api/public/canvasConsumer")
    public ResponseEntity<Long> createCanvasConsumer(@RequestBody String stompClientTopic){
        logger.info("Recieved createCanvasConsumer POST request");
        CanvasConsumerRunner canvasConsumer = new CanvasConsumerRunner(simp, stompClientTopic);
        Thread thread = new Thread(canvasConsumer);
        threadMap.addThread(thread, canvasConsumer);
        thread.start();
        logger.info("started new thread: " + thread.getId());
        
        return new ResponseEntity<Long>(thread.getId(), null, HttpStatus.ACCEPTED);
    }

    //Need to change to DELETE request
    @PostMapping("api/public/canvasConsumer/delete")
    public ResponseEntity<Long> deleteCanvasConsumer(@RequestBody long threadId){
        logger.info("Recieved createCanvasConsumer delete request");
        threadMap.deleteThread(threadId);
        
        return new ResponseEntity<Long>(null, null, HttpStatus.OK);
    }
}