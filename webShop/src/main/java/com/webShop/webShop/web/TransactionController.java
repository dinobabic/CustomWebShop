package com.webShop.webShop.web;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webShop.webShop.domain.Product;
import com.webShop.webShop.domain.Transaction;
import com.webShop.webShop.domain.User;
import com.webShop.webShop.service.ProductService;
import com.webShop.webShop.service.TransactionService;
import com.webShop.webShop.service.UserService;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
	
	@Autowired
	private TransactionService transactionService;
	@Autowired
	private ProductService productService;
	@Autowired
	private UserService userService;
	

	@PostMapping
	public ResponseEntity<?> newTransaction(@RequestBody Long[] productIds, @AuthenticationPrincipal User user) {
		
		Transaction transaction = new Transaction();
		for (Long id : productIds) {
			Product product = productService.findById(id).orElse(new Product());
			transaction.addProduct(product);
			product.setTransaction(transaction);
		}
		transaction.setUser(user);
		transaction.setIssueDate(LocalDate.now());
		
		return ResponseEntity.ok(transactionService.save(transaction));
	}
	
	@GetMapping("{transactionId}")
	public ResponseEntity<?> getTransaction(@PathVariable Long transactionId, @AuthenticationPrincipal User user) {
		Transaction transaction = transactionService.findByid(transactionId).orElse(new Transaction());
		if (transaction.getUser().getUsername().equals(user.getUsername())) {
			return ResponseEntity.ok(transaction);
		}
		else {
			return ResponseEntity.ok(new Transaction());
		}
	}
	
	@GetMapping
	public ResponseEntity<?> getTransactions(@AuthenticationPrincipal User user) {
		User userDb = userService.findByUsername(user.getUsername()).orElse(new User());
		return ResponseEntity.ok(transactionService.findByUser(userDb));
	}
}















