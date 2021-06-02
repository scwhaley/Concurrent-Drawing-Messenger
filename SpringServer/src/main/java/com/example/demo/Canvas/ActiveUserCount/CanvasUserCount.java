package com.example.demo.Canvas.ActiveUserCount;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "canvas_user_count")
public class CanvasUserCount {

    @Id
    private Integer canvas_ID;
    private Integer active_users;

    protected CanvasUserCount() {};

    public CanvasUserCount(Integer active_users, Integer canvas_ID){
        this.setActive_users(active_users);
        this.setCanvasID(canvas_ID);
    }

    public Integer getCanvasID(){
        return this.canvas_ID;
    }

    public void setCanvasID(Integer id){
        this.canvas_ID = id;
    }
    
    public Integer getActive_users() {
        return active_users;
    }

    public void setActive_users(Integer active_users) {
        this.active_users = active_users;
    }
}

