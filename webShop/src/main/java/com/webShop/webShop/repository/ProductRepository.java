package com.webShop.webShop.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.webShop.webShop.domain.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
	
	public Optional<Product> findByName(String name);
}
