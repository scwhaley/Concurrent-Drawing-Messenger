package com.example.demo.Canvas;

import java.util.List;

import com.example.demo.DemoApplication;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CanvasService {

    private Logger logger = LoggerFactory.getLogger(DemoApplication.class);

    @Autowired
    private CanvasRepository canvasRepo;
    
    public List<Canvas> getSubscribedCanvasesByUserId(int userId){
        List<Canvas> subcribedCanvases = canvasRepo.getSubscribedCanvasesByUserId(userId);
        logger.info("Subbed Canvases: " + subcribedCanvases.size());
        return subcribedCanvases;
    }
}
