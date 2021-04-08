package com.example.demo.Canvas.CanvasSubscription;

import java.io.Serializable;
import java.util.Objects;

public class CanvasSubscriptionId implements Serializable {

    private Integer canvasID;
    private Integer userID;
    
    public CanvasSubscriptionId () {}

    public CanvasSubscriptionId(Integer canvasID, Integer userID) {
        this.canvasID = canvasID;
        this.userID = userID;
    }

    @Override
    public boolean equals(Object o){
        //Check if the same object
        if (this == o){return true;}
        //Check if object o is null or different class type
        if ((o == null) || (this.getClass() != o.getClass())){return false;}
        //Object o must be this class type. Check if fields are identical
        CanvasSubscriptionId asThisType = (CanvasSubscriptionId) o;
        return(asThisType.canvasID == this.canvasID && asThisType.userID == this.userID);
    }

    @Override
    public int hashCode(){
        return Objects.hash(canvasID, userID);
    }
}
