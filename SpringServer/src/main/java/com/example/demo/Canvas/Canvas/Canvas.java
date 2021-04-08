package com.example.demo.Canvas.Canvas;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "canvases")
public class Canvas {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer canvas_ID;
    private String name;

    protected Canvas() {};

    public Canvas(String name){
        this.name = name;
    }

    public Integer getCanvasID(){
        return this.canvas_ID;
    }

    public void setCanvasID(Integer id){
        this.canvas_ID = id;
    }

    public String getName(){
        return this.name;
    }

    public void setName(String name){
        this.name = name;
    }
    
}
