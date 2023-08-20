package com.caltech.ecommerce.service;

import com.caltech.ecommerce.bean.User;
import com.caltech.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public User registerUser(User user){
        return userRepository.save(user);
    }
}
