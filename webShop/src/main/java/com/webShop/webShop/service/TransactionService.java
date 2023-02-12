package com.webShop.webShop.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webShop.webShop.domain.Transaction;
import com.webShop.webShop.domain.User;
import com.webShop.webShop.repository.TransactionRepository;

@Service
public class TransactionService {
	
	 @Autowired
	 private TransactionRepository transactionRepository;
	 
	 public Transaction save(Transaction transaction) {
		 return transactionRepository.save(transaction);
	 }
	 
	 public Optional<Transaction> findByid(Long id) {
		 return transactionRepository.findById(id);
	 }
	 
	 public List<Transaction> findByUser(User user) {
		 return transactionRepository.findByUser(user);
	 }
}
