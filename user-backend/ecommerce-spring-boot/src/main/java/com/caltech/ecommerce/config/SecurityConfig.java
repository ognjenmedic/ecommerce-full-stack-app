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

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
    private String issuerUri;

    @Bean
    public JwtDecoder jwtDecoder() {
        NimbusJwtDecoder jwtDecoder = JwtDecoders.fromOidcIssuerLocation(issuerUri);
        // Configure jwtDecoder if necessary
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
                // Add any other endpoints that should be publicly accessible
                .anyRequest().authenticated()
                .and()
                .oauth2ResourceServer()
                .jwt(); // Configure JWT-based authentication
    }



}
