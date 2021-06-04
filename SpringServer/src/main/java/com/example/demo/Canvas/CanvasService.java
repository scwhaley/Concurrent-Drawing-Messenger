package com.example.demo.Canvas;

import java.util.List;
import java.util.Optional;

import com.example.demo.DemoApplication;
import com.example.demo.Canvas.ActiveUserCount.CanvasUserCount;
import com.example.demo.Canvas.ActiveUserCount.CanvasUserCountRepo;
import com.example.demo.Canvas.Canvas.Canvas;
import com.example.demo.Canvas.Canvas.CanvasRepository;
import com.example.demo.Canvas.CanvasSubscription.CanvasSubscription;
import com.example.demo.Canvas.CanvasSubscription.CanvasSubscriptionRepo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class CanvasService {

    private Logger logger = LoggerFactory.getLogger(DemoApplication.class);

    private CanvasRepository canvasRepo;
    private CanvasSubscriptionRepo canvasSubscriptionRepo;
    private CanvasUserCountRepo canvasUserCountRepo;

    public CanvasService(CanvasRepository canvasRepo, CanvasSubscriptionRepo canvasSubscriptionRepo, CanvasUserCountRepo canvasUserCountRepo){
        this.canvasRepo = canvasRepo;
        this.canvasSubscriptionRepo = canvasSubscriptionRepo;
        this.canvasUserCountRepo = canvasUserCountRepo;
    }
    
    public List<Canvas> getSubscribedCanvasesByUserId(Integer userId){
        List<Canvas> subcribedCanvases = canvasRepo.getSubscribedCanvasesByUserId(userId);
        logger.info("Subbed Canvases: " + subcribedCanvases.size());
        return subcribedCanvases;
    }

    public Canvas createAndSubscribeToCanvas(String canvasName, Integer userID){
        //limit canvas name to 50 chars by truncating
        if(canvasName.length() > 50){
            canvasName = canvasName.substring(0, 50);
        }
        Canvas newCanvas = new Canvas(canvasName);
        //Must save canvas first because the ID is set by the database, not the constructor
        Canvas canvas = canvasRepo.save(newCanvas);

        CanvasSubscription newSub = new CanvasSubscription(canvas.getCanvasID(), userID);        
        canvasSubscriptionRepo.save(newSub);

        return canvas;
    }

    
    public Integer getNumberOfActiveUsers(Integer canvasID){
        Integer numActiveUsers = 0;

        Optional<CanvasUserCount> canvasUserCount = canvasUserCountRepo.findById(canvasID);
        
        // Returns 0 even if the canvasID does not exist
        if(canvasUserCount.isPresent()){
            numActiveUsers = canvasUserCount.get().getActive_users();
        }

        return numActiveUsers;
    }
}
