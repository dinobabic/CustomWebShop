package com.webShop.webShop.security;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtService {
	
	public static final long JWT_TOKEN_VALIDITY = 24 * 60 * 60 * 1000;
	private static final String SECRET_KEY = "6150645367566B5970337336763979244226452948404D6251655468576D5A71";
	
	public String extractUsername(String token) {
		return extractClaim(token, Claims::getSubject);
	}

	private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = extractAllClaims(token);
		return claimsResolver.apply(claims);
	}
	
	public String generateToken(UserDetails userDetails) {
		HashMap<String, Object> extraClaims = new HashMap<>();
		extraClaims.put("authorities", userDetails.getAuthorities().stream()
				.map((auth) -> auth.getAuthority()).collect(Collectors.toList()));
		return generateToken(extraClaims, userDetails);
	}
	
	public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
		return Jwts
				.builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
	}

	private Claims extractAllClaims(String token) {
		return Jwts
				.parserBuilder()
				.setSigningKey(getSigningKey())
				.build()
				.parseClaimsJws(token)
				.getBody();
	}
	
	public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return userDetails != null && username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token)  {
        return extractExpiration(token).before(new Date());
    }
    
    public boolean checkIfTokenIsExpired(String token) {
    	DecodedJWT jwt = JWT.decode(token);
    	if (jwt.getExpiresAt().after(new Date())) {
    		return true;
    	}
    	return false;
    }

    private Date extractExpiration(String token)  {
        return extractClaim(token, Claims::getExpiration);
    }

	private Key getSigningKey() {
		byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
		return Keys.hmacShaKeyFor(keyBytes);
	}
}








