package com.employeehub.backend; 
import io.jsonwebtoken.Jwts; 
import io.jsonwebtoken.security.Keys; 
import org.springframework.stereotype.Component; 
import javax.crypto.SecretKey; 
import java.util.Date; 

@Component 
public class JwtUtil { 
    private final SecretKey key = Keys.hmacShaKeyFor( "employeehub-super-secret-key-employeehub-super-secret-key".getBytes()); 
    private final long expirationMs = 24 * 60 * 60 * 1000; 
    public String generateToken(String username) { 
        return Jwts.builder() .subject(username) .issuedAt(new Date()) .expiration(new Date(System.currentTimeMillis() + expirationMs)) .signWith(key) .compact(); 
    } 
    
    public String extractUsername(String token) { 
        return Jwts.parser() .verifyWith(key) .build() .parseSignedClaims(token) .getPayload() .getSubject(); 
    } 
    
    public boolean isTokenValid(String token) { 
        try { 
            Jwts.parser().verifyWith(key).build().parseSignedClaims(token); 
            return true; 
        } 
        catch (Exception e) { 
            return false; 
        } 
    } 
}