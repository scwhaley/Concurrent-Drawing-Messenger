package com.example.demo.Canvas.CanvasSubscription;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CanvasSubscriptionRepo extends CrudRepository<CanvasSubscription, CanvasSubscriptionId> {
    
}
