package com.example.demo.Canvas;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "canvas_subscriptions")
public class CanvasSubscription {

    private Integer canvasID;
    private Integer userID;

    protected CanvasSubscription(){};

    public CanvasSubscription(Integer canvasID, Integer userID){
        this.setCanvasID(canvasID);
        this.setUserID(userID);
    }

    public Integer getCanvasID() {
        return canvasID;
    }

    public void setCanvasID(Integer canvasID) {
        this.canvasID = canvasID;
    }

    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }
}
