package com.example.demo.Greeting;

public class Greeting {
    private final long ID;
    private final String content;

    public Greeting(long id, String content) {
        this.ID = id;
        this.content = content;
    }

    public long getID() {
        return ID;
    }

    public String getContent() {
        return content;
    }

    
}
