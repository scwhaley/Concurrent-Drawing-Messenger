package com.example.demo.Canvas.ActiveUserCount;

import java.util.Optional;

import com.example.demo.DemoApplication;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;

@Component
public class CanvasSubscriptionEventListeners {
    
    private static final Logger logger = LoggerFactory.getLogger(DemoApplication.class);

    private CanvasUserCountRepo canvasUserCountRepo;

    public CanvasSubscriptionEventListeners(CanvasUserCountRepo canvasUserCountRepo) {
        this.canvasUserCountRepo = canvasUserCountRepo;
    }

    @EventListener(SessionConnectEvent.class)
	public void handleWSConnectListener (SessionConnectEvent event){
		logger.info("Recieved WS Session Connect Event");
	}

	@EventListener(SessionSubscribeEvent.class)
	public void handleWSSubscribeListener (SessionSubscribeEvent event){
		StompHeaderAccessor headers = StompHeaderAccessor.wrap(event.getMessage());
        String destination = headers.getDestination();
        String canvasID = destination.substring(destination.lastIndexOf("/")+1);
		logger.info("Recieved WS Session Subscribe Event to cavnasID: " + canvasID);

        logger.info("User count before Subscribe Event = " + getNumberOfActiveUsers(Integer.decode(canvasID)));

        canvasUserCountRepo.incrementActiveUserCount(Integer.decode(canvasID));
        
        logger.info("User count after Subscribe Event = " + getNumberOfActiveUsers(Integer.decode(canvasID)));
	}

    @EventListener(SessionUnsubscribeEvent.class)
	public void handleWSUnsubscribeListener (SessionUnsubscribeEvent event){
		StompHeaderAccessor headers = StompHeaderAccessor.wrap(event.getMessage());
        String destination = headers.getDestination();
        String canvasID = destination.substring(destination.lastIndexOf("/")+1);
		logger.info("Recieved WS Session unsubscribe Event to cavnasID: " + canvasID);

        logger.info("User count before unsubscribe Event = " + getNumberOfActiveUsers(Integer.decode(canvasID)));

        canvasUserCountRepo.decrementActiveUserCount(Integer.decode(canvasID));
        
        logger.info("User count after unsubscribe Event = " + getNumberOfActiveUsers(Integer.decode(canvasID)));
	}

    private Integer getNumberOfActiveUsers(Integer canvasID){
        Integer numActiveUsers = 0;

        Optional<CanvasUserCount> canvasUserCount = canvasUserCountRepo.findById(canvasID);
        
        // Returns 0 even if the canvasID does not exist
        if(canvasUserCount.isPresent()){
            numActiveUsers = canvasUserCount.get().getActive_users();
        }

        return numActiveUsers;
    }
}
