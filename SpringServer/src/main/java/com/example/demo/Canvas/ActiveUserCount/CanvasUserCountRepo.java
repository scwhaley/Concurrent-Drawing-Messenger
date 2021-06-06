package com.example.demo.Canvas.ActiveUserCount;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface CanvasUserCountRepo extends CrudRepository<CanvasUserCount, Integer> {
    
    //This inserts a new row, but if it alredy exists for the specified canvas, increments the number of active users
    //Because this method uses the INSERT and UPDATE statements, we must use the @Modifying annotation. Since these statements
    //are meant to change the data in the database, the persistence context needs to be modified as well.
    //The @Transactional annotation is required to indicat
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO canvas_user_count (canvas_id, active_users) VALUES(:canvas_ID,1) ON CONFLICT(canvas_id) DO UPDATE SET active_users = canvas_user_count.active_users + 1",
    nativeQuery = true)
    public void incrementActiveUserCount(@Param("canvas_ID") Integer canvas_ID);

    @Modifying
    @Query(value = "UPDATE canvas_user_count SET active_users = canvas_user_count.active_users - 1 WHERE canvas_id = :canvas_ID",
    nativeQuery = true)
    public void decrementActiveUserCount(@Param("canvas_ID") Integer canvas_ID);
}
