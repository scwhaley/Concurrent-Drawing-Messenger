package com.example.demo.Canvas.ActiveUserCount;

import java.util.Optional;

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

    public CanvasSubscriptionEventListeners(CanvasUserCountRepo canvasUserCountRepo) {
        this.canvasUserCountRepo = canvasUserCountRepo;
    }

	@EventListener(SessionSubscribeEvent.class)
	public void handleWSSubscribeListener (SessionSubscribeEvent event){
		String canvasID = extractCanvasID(event.getMessage());

		logger.info("Recieved WS Session Subscribe Event to canvasID: " + canvasID);
        logger.info("User count before Subscribe Event = " + getNumberOfActiveUsers(Integer.decode(canvasID)));

        canvasUserCountRepo.incrementActiveUserCount(Integer.decode(canvasID));
        
        logger.info("User count after Subscribe Event = " + getNumberOfActiveUsers(Integer.decode(canvasID)));
	}

    //This does not work as written since the UNSUBSCRIBE frame does not unsubscribe to a destination, it unsubsribers via ID of the subscription.
    //This ID is specific to the connection (what does connectino exactly mean?). So we must find some way to correlate the ID to the destination.
    @EventListener(SessionUnsubscribeEvent.class)
	public void handleWSUnsubscribeListener (SessionUnsubscribeEvent event){
        String canvasID = extractCanvasID(event.getMessage());

		logger.info("Recieved WS Session unsubscribe Event to canvasID: " + canvasID);
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

    private String extractCanvasID(Message<byte[]> message){
        StompHeaderAccessor headers = StompHeaderAccessor.wrap(message);
        String destination = headers.getDestination();
        return destination.substring(destination.lastIndexOf("/")+1);
    }
}
