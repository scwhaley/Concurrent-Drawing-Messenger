package com.example.demo.Canvas;

import java.util.HashMap;
import java.util.Map;

import org.apache.kafka.common.errors.WakeupException;
import org.springframework.stereotype.Component;

@Component
public class CanvasConsumerThreadMap {

    private Map<Long, Thread> threadStore;
    private Map<Long, CanvasConsumerRunner> canvasConsumerStore;

    public CanvasConsumerThreadMap(){
        threadStore = new HashMap<Long, Thread>();
        canvasConsumerStore = new HashMap<Long, CanvasConsumerRunner>();
    }

    //Adds the thread and canvasConsumer to maps for using the thread ID as the key
    public long addThread(Thread thread, CanvasConsumerRunner canvasConsumer){
        if(thread == null || canvasConsumer == null){
            throw new IllegalArgumentException("Thread and canvasConsumer to add cannot be null");
        }

        Thread prevThreadValue = threadStore.putIfAbsent(thread.getId(), thread);
        if(prevThreadValue != null){
            throw new IllegalArgumentException("Thread already exists in the thread store");
        }

        CanvasConsumerRunner prevCanvasConsumerValue = canvasConsumerStore.putIfAbsent(thread.getId(), canvasConsumer);
        if(prevCanvasConsumerValue != null){
            throw new IllegalArgumentException("CanvasConsumer already exists in the canvasConsumer store");
        }

        return thread.getId();
    }

    public Thread getThread(long id){
        Thread thread = threadStore.get(id);

        if(thread == null){
            throw new IllegalArgumentException("Thread id does not exist in the thread store");
        }

        return thread;
    }

    public CanvasConsumerRunner getCanvasConsumer(long id){
        CanvasConsumerRunner canvasConsumer = canvasConsumerStore.get(id);

        if(canvasConsumer == null){
            throw new IllegalArgumentException("Thread id does not exist in the thread store");
        }

        return canvasConsumer;
    }

    //Removes thread and canvasConsumer from maps and terminates the thread
    public void deleteThread(long id){
        Thread thread = threadStore.remove(id);
        CanvasConsumerRunner canvasConsumer = canvasConsumerStore.remove(id);

        if(thread == null || canvasConsumer == null){
            throw new IllegalArgumentException("Thread id does not exist in the thread store");
        }

        canvasConsumer.shutdown();
    }

    //Shuts down all the canvas consumers before removing them and the hosting threads from the stores
    public void deleteAllThreads(){
        canvasConsumerStore.forEach((k,v) -> v.shutdown());

        threadStore.clear();
        canvasConsumerStore.clear();
    }
}
