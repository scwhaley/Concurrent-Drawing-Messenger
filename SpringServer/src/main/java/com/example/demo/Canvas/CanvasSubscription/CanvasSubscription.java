package com.example.demo.Canvas.CanvasSubscription;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Entity
@Table(name = "canvas_subscriptions")
@IdClass(CanvasSubscriptionId.class)
public class CanvasSubscription {

    @Id
    private Integer canvasID;
    @Id
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
