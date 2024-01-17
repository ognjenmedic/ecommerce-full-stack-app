package com.caltech.ecommerce.controller;

import com.caltech.ecommerce.entity.User;
import com.caltech.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user){
        User registeredUser = userService.registerUser(user);
        return new ResponseEntity<>(registeredUser,HttpStatus.CREATED);

    }

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody User user){
        User existingUser = userService.findUserByEmail(user.getEmail());
        if(existingUser != null && existingUser.getPassword().equals(user.getPassword())){
            return new ResponseEntity<>(existingUser, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }
}
