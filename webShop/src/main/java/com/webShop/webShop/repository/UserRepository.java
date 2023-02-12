package com.webShop.webShop.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.webShop.webShop.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {

	public Optional<User> findByUsername(String username);
	
	public Optional<User> findByEmail(String email);


}
