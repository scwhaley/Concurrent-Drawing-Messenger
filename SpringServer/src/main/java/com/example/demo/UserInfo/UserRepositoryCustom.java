package com.example.demo.UserInfo;

public interface UserRepositoryCustom<T,S> {
    public ApplicationUser findByUsername(String username);
}