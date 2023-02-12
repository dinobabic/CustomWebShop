package com.webShop.webShop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.webShop.webShop.domain.Transaction;
import com.webShop.webShop.domain.User;

public interface TransactionRepository extends JpaRepository<Transaction, Long>{

	public List<Transaction> findByUser(User user);
}
