package com.webShop.webShop.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webShop.webShop.domain.User;
import com.webShop.webShop.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	public Optional<User> findByUsername(String username) {
		return userRepository.findByUsername(username);
	}
	
	public Optional<User> findByEmail(String email) {
		return userRepository.findByEmail(email);
	}
	
	public User save(User user) {
		return userRepository.save(user);
	}
}
