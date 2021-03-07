package com.example.demo.Security;

public interface UserRepositoryCustom<T,S> {
    public User findByUsername(String username);
}