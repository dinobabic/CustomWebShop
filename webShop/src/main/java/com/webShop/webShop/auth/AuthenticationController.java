package com.webShop.webShop.auth;

import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.webShop.webShop.domain.Authority;
import com.webShop.webShop.domain.User;
import com.webShop.webShop.security.JwtService;
import com.webShop.webShop.service.AuthorityService;
import com.webShop.webShop.service.EmailService;
import com.webShop.webShop.service.PasswordGeneratorService;
import com.webShop.webShop.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private JwtService jwtService;
	@Autowired
	private UserService userService;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private AuthorityService authorityService;
	@Autowired
	private EmailService emailService;
	@Autowired
	private PasswordGeneratorService passwordGeneratorService;
	
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
		
		User user = new User();
		user.setUsername(request.getUsername());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setLastName(request.getLastName());
		user.setFirstName(request.getFirstName());
		user.setEmail(request.getEmail());
		
		Authority authority = authorityService.findByName("ROLE_CUSTOMER");
		user.addAuthority(authority);
		
		userService.save(user);
		String token = jwtService.generateToken(user);
		return ResponseEntity.ok().body(token);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody AuthenticationRequest request) {
		try {
			Authentication authentication = authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
			
			User user = (User)authentication.getPrincipal();
			user = userService.findByUsername(user.getUsername()).get();
			user.setPassword(null);
			
			String token = jwtService.generateToken(user);
			return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION, token).body(user);
		}
		catch (BadCredentialsException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}
	
	@PutMapping("/update") 
	public ResponseEntity<?> update(@RequestBody UpdateRequest request) {
		User user = new User();
		user.setId(request.getId());
		user.setUsername(request.getUsername());
		user.setLastName(request.getLastName());
		user.setFirstName(request.getFirstName());
		user.setEmail(request.getEmail());
		if (!request.getPassword().equals("")) {
			user.setPassword(passwordEncoder.encode(request.getPassword()));
		}
		else {
			User userDb = userService.findByUsername(request.getUsername()).orElse(new User());
			user.setPassword(userDb.getPassword());
		}
		
		userService.save(user);
		return ResponseEntity.ok(user);
	}
	
	@GetMapping() 
	public ResponseEntity<?> getUser(@AuthenticationPrincipal User user) {
		User userDb = userService.findByUsername(user.getUsername()).orElse(new User());
		userDb.setPassword("");
		return ResponseEntity.ok(userDb);
	}
	
	@PostMapping("/forgotCredentials")
	public ResponseEntity<?> forgotCredentials(@RequestBody ForgotCredentials forgotCredentials) {
		User user = userService.findByEmail(forgotCredentials.getEmail()).orElse(null);
		if (user == null) {
			return ResponseEntity.ok(false);
		}
		else {
			String newPassword = passwordGeneratorService.generatePassayPassword();
			user.setPassword(passwordEncoder.encode(newPassword));
			userService.save(user);
			String emailText = "Hello, " + user.getFirstName() + "\n\nYour credentials for Webshop are\n\tUsername: " + user.getUsername() + "\n\tPassword: " + newPassword + "\n\nWith best regards";
			emailService.sendEmail(forgotCredentials.getEmail(), "Webshop Credentials", emailText);
			return ResponseEntity.ok(true);
		}
	}
	
	@GetMapping("/validate")
	public ResponseEntity<?> validateToken(@RequestParam String token) {
		boolean validToken = jwtService.checkIfTokenIsExpired(token);
		return ResponseEntity.ok(validToken);
	}
}

