package com.caltech.ecommerce.controller;

import com.caltech.ecommerce.dto.UserDTO;
import com.caltech.ecommerce.entity.User;
import com.caltech.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;

import java.security.Principal;

@RestController
@RequestMapping("api/users")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser(@AuthenticationPrincipal Jwt jwt) {
        String auth0Id = jwt.getSubject();
        String name = jwt.getClaimAsString("https://myecommerceapp.com/name");
        String email = jwt.getClaimAsString("https://myecommerceapp.com/email");
        User user = userService.findOrCreateUser(auth0Id, name, email);
        UserDTO userDTO = userService.convertToDTO(user);
        return ResponseEntity.ok(userDTO);
    }


    @GetMapping("/findOrCreate")
    public ResponseEntity<UserDTO> findOrCreateUser(@RequestParam String auth0Id, @RequestParam String name, @RequestParam String email) {
        User user = userService.findOrCreateUser(auth0Id, name, email);
        UserDTO userDTO = userService.convertToDTO(user);
        return ResponseEntity.ok(userDTO);
    }


}
