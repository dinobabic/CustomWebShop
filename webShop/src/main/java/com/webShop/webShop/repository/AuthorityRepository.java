package com.webShop.webShop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.webShop.webShop.domain.Authority;

public interface AuthorityRepository extends JpaRepository<Authority, Long> {

	public Authority findByAuthority(String authority);
}
