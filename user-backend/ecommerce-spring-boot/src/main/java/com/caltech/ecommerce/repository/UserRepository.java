package com.caltech.ecommerce.repository;

import com.caltech.ecommerce.bean.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
