package com.example.demo.Canvas;

import java.util.List;

import com.example.demo.DemoApplication;
import com.example.demo.Canvas.Canvas.Canvas;
import com.example.demo.Canvas.Canvas.CanvasRepository;
import com.example.demo.Canvas.CanvasSubscription.CanvasSubscription;
import com.example.demo.Canvas.CanvasSubscription.CanvasSubscriptionRepo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CanvasService {

    private Logger logger = LoggerFactory.getLogger(DemoApplication.class);

    @Autowired
    private CanvasRepository canvasRepo;
    @Autowired
    private CanvasSubscriptionRepo canvasSubscriptionRepo;
    
    public List<Canvas> getSubscribedCanvasesByUserId(Integer userId){
        List<Canvas> subcribedCanvases = canvasRepo.getSubscribedCanvasesByUserId(userId);
        logger.info("Subbed Canvases: " + subcribedCanvases.size());
        return subcribedCanvases;
    }

    public Canvas createAndSubscribeToCanvas(String canvasName, Integer userID){
        Canvas newCanvas = new Canvas(canvasName);
        CanvasSubscription newSub = new CanvasSubscription(newCanvas.getCanvasID(), userID);

        Canvas canvas = canvasRepo.save(newCanvas);
        canvasSubscriptionRepo.save(newSub);

        return canvas;
    }
}
