package com.webShop.webShop.domain;

import org.springframework.security.core.GrantedAuthority;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "authority")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Authority implements GrantedAuthority {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1882164706010079462L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	
	private String authority;
}
