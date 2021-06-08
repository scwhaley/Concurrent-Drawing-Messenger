package com.example.demo.Canvas.ActiveUserCount;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConnectionSessionCanvasRepo extends CrudRepository<ConnectionSessionCanvas, String>{
    
}
