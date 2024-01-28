package com.caltech.ecommerce.dto;

public class UserDTO {
    private Long userId;
    private String name;
    private String email;
    private String auth0id;

    public UserDTO() {
    }

    public UserDTO(Long userId, String name, String email, String auth0id) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.auth0id = auth0id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAuth0id() {
        return auth0id;
    }

    public void setAuth0id(String auth0id) {
        this.auth0id = auth0id;
    }

    @Override
    public String toString() {
        return "UserDTO{" +
                "userId=" + userId +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", auth0id='" + auth0id + '\'' +
                '}';
    }

}
