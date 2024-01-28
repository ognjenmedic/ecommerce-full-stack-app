package com.caltech.ecommerce.repository;

import com.caltech.ecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByAuth0id(String auth0id);
}
