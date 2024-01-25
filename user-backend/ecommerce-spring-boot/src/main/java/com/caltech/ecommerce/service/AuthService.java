package com.caltech.ecommerce.service;

import com.caltech.ecommerce.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;

@Service
public class AuthService {

    private final RestTemplate restTemplate;
    private final String auth0Domain;
    private final String auth0ApiToken;

    public AuthService(RestTemplate restTemplate,
                       @Value("${auth0.domain}") String auth0Domain,
                       @Value("${auth0.api-token}") String auth0ApiToken) {
        this.restTemplate = restTemplate;
        this.auth0Domain = auth0Domain;
        this.auth0ApiToken = auth0ApiToken;
    }

    public String createAuth0User(User user, String password) {
        String url = "https://" + auth0Domain + "/api/v2/users";
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(auth0ApiToken);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("email", user.getEmail());
        requestBody.put("password", password);
        requestBody.put("name", user.getName());
        requestBody.put("connection", "Username-Password-Authentication");

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);
            Map<String, Object> responseBody = response.getBody();
            System.out.println("Auth0 Response Body: " + responseBody);
            return responseBody != null ? (String) responseBody.get("user_id") : null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}

