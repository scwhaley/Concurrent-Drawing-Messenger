package com.example.demo.Canvas;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CanvasRepository extends CrudRepository<Canvas, Integer>{
    
    @Query(value = "SELECT canvas_subscriptions.canvas_id, canvases.name FROM canvas_subscriptions INNER JOIN canvases ON canvas_subscriptions.canvas_id = canvases.canvas_id where canvas_subscriptions.user_id = :userID",
    nativeQuery = true)
    public List<Canvas> getSubscribedCanvasesByUserId(@Param("userID") Integer userId);

}
