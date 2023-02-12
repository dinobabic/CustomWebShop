package com.webShop.webShop.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.webShop.webShop.domain.User;
import com.webShop.webShop.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<User> userOpt = userRepository.findByUsername(username);
		return userOpt.orElseThrow(() -> new UsernameNotFoundException("Invalid username!"));
	}

}
