package com.caltech.ecommerce.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.caltech.ecommerce.service.SecretsManagerService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import javax.sql.DataSource;
import java.util.Map;

@Configuration
@Profile("prod")
public class DatabaseConfig {

    private final SecretsManagerService secretsManagerService;
    private static final Logger logger = LoggerFactory.getLogger(DatabaseConfig.class);
    public DatabaseConfig(SecretsManagerService secretsManagerService) {
        this.secretsManagerService = secretsManagerService;
    }

    @Bean
    public DataSource dataSource() {
        Map<String, String> dbCredentials = secretsManagerService.getSecrets("prod/ecommerce_caltech/mysql");
        DriverManagerDataSource dataSource = new DriverManagerDataSource();

        String jdbcUrl = "jdbc:mysql://" + dbCredentials.get("host") +
                ":3306/" + dbCredentials.get("dbname") + "?useSSL=false&allowPublicKeyRetrieval=true";
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setUrl(jdbcUrl);
        dataSource.setUsername(dbCredentials.get("username"));
        dataSource.setPassword(dbCredentials.get("password"));

        logger.info("Configured JDBC URL (without credentials): {}", jdbcUrl);
        return dataSource;
    }


}
