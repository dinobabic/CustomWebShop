package com.webShop.webShop.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.webShop.webShop.security.JwtFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	@Autowired
	private JwtFilter jwtFilter;
	@Autowired
	private AuthenticationProvider provider;
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		return http
				.csrf().disable()
				.cors().disable()
				.authorizeHttpRequests()
					.requestMatchers("/api/auth/**")
						.permitAll()
					.anyRequest()
						.authenticated()
				.and()
				.sessionManagement()
					.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and()
					.authenticationProvider(provider)
					.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
				.build();
	}
}
