package com.caltech.ecommerce.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.amazonaws.services.secretsmanager.AWSSecretsManager;
import com.amazonaws.services.secretsmanager.AWSSecretsManagerClientBuilder;
import com.amazonaws.services.secretsmanager.model.GetSecretValueRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.util.Map;

@Service
@Profile("prod")
public class SecretsManagerService {
    private final Logger logger = LoggerFactory.getLogger(SecretsManagerService.class);

    private final AWSSecretsManager secretsManagerClient;
    private final ObjectMapper objectMapper;

    public SecretsManagerService() {
        this.secretsManagerClient = AWSSecretsManagerClientBuilder.standard().build();
        this.objectMapper = new ObjectMapper();
    }

    public Map<String, String> getSecrets(String secretName) {
        logger.info("Fetching secret for: {}", secretName);
        GetSecretValueRequest request = new GetSecretValueRequest().withSecretId(secretName);

        try {
            String secretString = secretsManagerClient.getSecretValue(request).getSecretString();
            logger.info("Successfully retrieved secret for: {}", secretName);
            return objectMapper.readValue(secretString, Map.class);
        } catch (IOException e) {
            logger.error("Failed to parse secret string for: {}", secretName, e);
            throw new RuntimeException("Failed to parse secret string", e);
        } catch (Exception e) {
            logger.error("Error retrieving secret for: {}", secretName, e);
            throw new RuntimeException("Error retrieving secret", e);
        }
    }


}

