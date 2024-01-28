package com.caltech.ecommerce.service;

import com.caltech.ecommerce.dto.UserDTO;
import com.caltech.ecommerce.entity.User;
import com.caltech.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public User findOrCreateUser(String auth0id, String name, String email) {
        return userRepository.findByAuth0id(auth0id)
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setAuth0id(auth0id);
                    newUser.setName(name); // Assuming these setters exist
                    newUser.setEmail(email);
                    // set other default properties
                    return userRepository.save(newUser);
                });
    }



    public Optional<User> findUserByAuth0Id(String auth0id){
        return userRepository.findByAuth0id(auth0id);
    }

    public UserDTO convertToDTO(User user) {
        return new UserDTO(user.getUserId(), user.getName(), user.getEmail(), user.getAuth0id());
    }

}
