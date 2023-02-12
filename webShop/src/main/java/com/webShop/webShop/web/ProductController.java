package com.webShop.webShop.web;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.webShop.webShop.domain.Product;
import com.webShop.webShop.service.ProductService;

@RestController
@RequestMapping("api/products")
public class ProductController {
	
	@Autowired
	private ProductService productService;

	@PostMapping
	public ResponseEntity<?> createProduct() {
		Product savedProduct = productService.save();
		return ResponseEntity.ok(savedProduct);
	}
	
	@GetMapping
	public ResponseEntity<?> getProducts() {
		List<Product> products = productService.findAll();
		return ResponseEntity.ok(products);
	}
	
	@GetMapping("{productId}")
	public ResponseEntity<?> getProduct(@PathVariable Long productId) {
		Optional<Product> productOpt = productService.findById(productId);
		return ResponseEntity.ok(productOpt.orElse(new Product()));
	}
	
	@PutMapping(value = "{productId}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<?> updateProduct(@PathVariable Long productId, @RequestPart("properties") Product product,
					@RequestPart("file") MultipartFile file) {
		try {
			product.setImageData(file.getBytes());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ResponseEntity.ok(productService.save(product));
	}
	
	@DeleteMapping("{productId}")
	public ResponseEntity<?> deleteProduct(@PathVariable Long productId) {
		productService.deleteById(productId);
		return ResponseEntity.ok(true);
	}
}








