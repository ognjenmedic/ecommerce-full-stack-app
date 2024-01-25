package com.caltech.ecommerce.dto;

public class UserDTO {
    private Long userId;
    private String auth0Id;
    private String name;
    private String email;

    public UserDTO() {
    }

    public UserDTO(Long userId, String name, String email, String auth0Id) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.auth0Id = auth0Id;
    }

    public String getAuth0Id() {
        return auth0Id;
    }

    public void setAuth0Id(String auth0Id) {
        this.auth0Id = auth0Id;
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

    @Override
    public String toString() {
        return "UserDTO{" +
                "userId=" + userId +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", auth0Id='" + auth0Id + '\'' +
                '}';
    }
}
