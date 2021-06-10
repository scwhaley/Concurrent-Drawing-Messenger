package com.example.demo.Canvas.ActiveUserCount;

import java.util.Optional;

import javax.transaction.Transactional;

import com.example.demo.DemoApplication;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.Message;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;

@Component
public class CanvasSubscriptionEventListeners {
    
    private static final Logger logger = LoggerFactory.getLogger(DemoApplication.class);
    private CanvasUserCountRepo canvasUserCountRepo;
    private ConnectionSessionCanvasRepo connectionSessionCanvasRepo;

    public CanvasSubscriptionEventListeners(CanvasUserCountRepo canvasUserCountRepo, ConnectionSessionCanvasRepo connectionSessionCanvasRepo) {
        this.canvasUserCountRepo = canvasUserCountRepo;
        this.connectionSessionCanvasRepo = connectionSessionCanvasRepo;
    }

	@EventListener(SessionSubscribeEvent.class)
    @Transactional
	public void handleWSSubscribeListener (SessionSubscribeEvent event){
		Integer canvasID = Integer.decode(extractCanvasID(event.getMessage()));
        String sessionID = extractSessionID(event.getMessage());
		logger.info("Recieved WS Session Subscribe Event to canvasID: " + canvasID + " for sessionID: " + sessionID);

        ConnectionSessionCanvas sessionAndCanvas = new ConnectionSessionCanvas(sessionID, canvasID);
        connectionSessionCanvasRepo.save(sessionAndCanvas);

        logger.info("User count before Subscribe Event = " + getNumberOfActiveUsers(canvasID));
        canvasUserCountRepo.incrementActiveUserCount(canvasID);
	}

    @EventListener(SessionUnsubscribeEvent.class)
    @Transactional
	public void handleWSUnsubscribeListener (SessionUnsubscribeEvent event){
        StompHeaderAccessor headers = StompHeaderAccessor.wrap(event.getMessage());
        String sessionID = headers.getSessionId();

        Optional<ConnectionSessionCanvas> sessionAndCanvas = connectionSessionCanvasRepo.findById(sessionID);

        if(sessionAndCanvas.isPresent()){
            Integer canvasID = sessionAndCanvas.get().getCanvas_ID();
            logger.info("Recieved WS Session unsubscribe Event to canvasID: " + canvasID);

            logger.info("User count before unsubscribe Event = " + getNumberOfActiveUsers(canvasID));
            canvasUserCountRepo.decrementActiveUserCount(canvasID);

            connectionSessionCanvasRepo.delete(sessionAndCanvas.get());
        }
        else{
            logger.warn("Recieved unsubscribe event for a session not linked to a canvas");
        }		
	}

    private Integer getNumberOfActiveUsers(Integer canvasID){
        Optional<CanvasUserCount> canvasUserCount = canvasUserCountRepo.findById(canvasID);

        // Returns 0 if the canvasID does not exist in the DB or if it did but there are no users
        return canvasUserCount.orElse(new CanvasUserCount(0,0)).getActive_users();
    }

    private String extractCanvasID(Message<byte[]> message){
        StompHeaderAccessor headers = StompHeaderAccessor.wrap(message);
        String destination = headers.getDestination();
        return destination.substring(destination.lastIndexOf("/")+1);
    }

    private String extractSessionID(Message<byte[]> message){
        StompHeaderAccessor headers = StompHeaderAccessor.wrap(message);
        return headers.getSessionId();
    }
}
