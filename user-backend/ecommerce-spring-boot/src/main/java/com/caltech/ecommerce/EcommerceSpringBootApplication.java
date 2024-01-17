package com.caltech.ecommerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.caltech.ecommerce")
@EntityScan(basePackages = "com.caltech.ecommerce.entity")
@EnableJpaRepositories(basePackages = "com.caltech.ecommerce.repository")
public class EcommerceSpringBootApplication {

	public static void main(String[] args) {
		SpringApplication.run(EcommerceSpringBootApplication.class, args);
	}

}
