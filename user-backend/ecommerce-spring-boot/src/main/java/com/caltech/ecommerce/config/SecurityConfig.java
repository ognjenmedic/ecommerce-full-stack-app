package com.caltech.ecommerce.config;

import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.context.annotation.Bean;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.config.http.SessionCreationPolicy;

import javax.annotation.PostConstruct;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
    private String issuerUri;

    @Bean
    public JwtDecoder jwtDecoder() {
        String jwkSetUri = issuerUri.endsWith("/") ? issuerUri + ".well-known/jwks.json" : issuerUri + "/.well-known/jwks.json";
        NimbusJwtDecoder jwtDecoder = NimbusJwtDecoder.withJwkSetUri(jwkSetUri).build();
        return jwtDecoder;
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors() // Enable CORS and disable CSRF
                .and()
                .csrf().disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll() // Allow preflight OPTIONS requests
                .antMatchers("/public/**", "/categories", "/products/**").permitAll() // Permit unauthenticated access to categories and products
                .antMatchers("/wishlist/**", "/cart/**").authenticated() // Require authentication                .anyRequest().authenticated()
                .and()
                .oauth2ResourceServer()
                .jwt(); // Configure JWT-based authentication
    }



}
