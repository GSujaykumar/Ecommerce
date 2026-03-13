package com.ecommerce.gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity serverHttpSecurity) {
        serverHttpSecurity
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .authorizeExchange(exchange -> exchange
                        .pathMatchers("/api/products/**").permitAll()
                        .pathMatchers("/api/users/login", "/api/users/register").permitAll()
                        .pathMatchers("/eureka/**").permitAll()
                        .pathMatchers("/api/cart/**", "/api/orders/**", "/api/payment/**").authenticated()
                        .anyExchange().permitAll()) // Allow others (like users sync) but protect core business
                .oauth2ResourceServer(spec -> spec.jwt(org.springframework.security.config.Customizer.withDefaults()));
        
        return serverHttpSecurity.build();
    }

    @Bean
    public org.springframework.cloud.gateway.filter.GlobalFilter userContextFilter() {
        return (exchange, chain) -> exchange.getPrincipal()
                .filter(principal -> principal instanceof org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken)
                .cast(org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken.class)
                .map(org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken::getToken)
                .map(org.springframework.security.oauth2.jwt.Jwt::getSubject)
                .map(userId -> {
                    exchange.getRequest().mutate().header("X-User-Id", userId).build();
                    return exchange;
                })
                .defaultIfEmpty(exchange)
                .flatMap(chain::filter);
    }

//    @Bean
//    @org.springframework.core.annotation.Order(org.springframework.core.Ordered.HIGHEST_PRECEDENCE)
//    public CorsWebFilter corsWebFilter() {
//        CorsConfiguration config = new CorsConfiguration();
//        config.setAllowedOriginPatterns(Collections.singletonList("*"));
//        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//        config.setAllowedHeaders(Collections.singletonList("*"));
//        config.setAllowCredentials(true);
//        config.setMaxAge(3600L);
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", config);
//        return new CorsWebFilter(source);
//    }
}
