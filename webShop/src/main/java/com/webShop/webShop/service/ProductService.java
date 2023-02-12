package com.webShop.webShop.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webShop.webShop.domain.Product;
import com.webShop.webShop.repository.ProductRepository;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepository productRepository;
	
	public Product save() {
		Product product = new Product();
		return productRepository.save(product);
	}
	
	public Product save(Product product) {
		return productRepository.save(product);
	}
	
	public Optional<Product> findByName(String name) {
		return productRepository.findByName(name);
	}
	
	public Optional<Product> findById(Long id) {
		return productRepository.findById(id);
	}
	
	public List<Product> findAll() {
		return productRepository.findAll().stream().filter((product) -> product.getTransaction() == null).collect(Collectors.toList());
	}
	
	public void deleteById(Long id) {
		productRepository.deleteById(id);
	}
}
