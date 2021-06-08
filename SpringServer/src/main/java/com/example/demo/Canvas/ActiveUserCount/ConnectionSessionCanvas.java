package com.example.demo.Canvas.ActiveUserCount;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "connection_session_canvas")
public class ConnectionSessionCanvas {

    @Id
    private String connection_session_id;
    private int canvas_ID;

    protected ConnectionSessionCanvas() {};

    public ConnectionSessionCanvas(String connection_session_id, int canvas_ID){
        this.setConnection_session_id(connection_session_id);
        this.setCanvas_ID(canvas_ID);
    }

    public int getCanvas_ID() {
        return canvas_ID;
    }

    public void setCanvas_ID(int canvas_ID) {
        this.canvas_ID = canvas_ID;
    }

    public String getConnection_session_id() {
        return connection_session_id;
    }

    public void setConnection_session_id(String connection_session_id) {
        this.connection_session_id = connection_session_id;
    }
}
