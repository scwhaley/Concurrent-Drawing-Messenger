package com.example.demo.Security;

public interface UserRepositoryCustom<T,S> {
    public ApplicationUser findByUsername(String username);
}