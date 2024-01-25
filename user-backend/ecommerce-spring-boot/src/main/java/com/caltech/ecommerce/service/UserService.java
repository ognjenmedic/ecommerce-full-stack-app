package com.caltech.ecommerce.service;

import com.caltech.ecommerce.dto.UserDTO;
import com.caltech.ecommerce.entity.User;
import com.caltech.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(User user){
        User existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser != null) {
            existingUser.setAuth0Id(user.getAuth0Id());
            return userRepository.save(existingUser);
        } else {
            return userRepository.save(user);
        }
    }

    public User findUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public UserDTO convertToDTO(User user) {
        return new UserDTO(user.getUserId(), user.getName(), user.getEmail(), user.getAuth0Id());
    }

}
