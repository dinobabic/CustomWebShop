package com.webShop.webShop.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateRequest {

	private Long id;
	private String firstName;
	private String lastName;
	private String username;
	private String password;
	private String email;
}
