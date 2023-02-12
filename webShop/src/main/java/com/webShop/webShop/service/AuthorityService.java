package com.webShop.webShop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webShop.webShop.domain.Authority;
import com.webShop.webShop.repository.AuthorityRepository;

@Service
public class AuthorityService {

	@Autowired
	private AuthorityRepository authorityRepository;
	
	public Authority findByName(String authority) {
		return authorityRepository.findByAuthority(authority);
	}
}
