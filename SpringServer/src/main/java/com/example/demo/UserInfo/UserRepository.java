package com.example.demo.UserInfo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<ApplicationUser, Integer>, UserRepositoryCustom<ApplicationUser,Integer> {
   
}
