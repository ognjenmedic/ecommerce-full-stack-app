package com.caltech.ecommerce.controller;

import com.caltech.ecommerce.dto.RegistrationRequest;
import com.caltech.ecommerce.dto.UserDTO;
import com.caltech.ecommerce.entity.User;
import com.caltech.ecommerce.service.AuthService;
import com.caltech.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    private final AuthService authService;
    private final UserService userService;

    @Autowired
    public UserController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody RegistrationRequest registrationRequest){
        User user = new User();
        user.setName(registrationRequest.getName());
        user.setEmail(registrationRequest.getEmail());

        String auth0Id = authService.createAuth0User(user, registrationRequest.getPassword());

        user.setAuth0Id(auth0Id);

        User registeredUser = userService.registerUser(user);
        UserDTO userDTO = userService.convertToDTO(registeredUser);
        return new ResponseEntity<>(userDTO, HttpStatus.CREATED);
    }


}
