package com.employeehub.backend; 
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.security.crypto.password.PasswordEncoder; 
import org.springframework.web.bind.annotation.*; 
import java.util.Map; 

@RestController 
@RequestMapping("/auth") public class AuthController { 
    
    @Autowired 
    private UserRepository userRepository; 
    
    @Autowired 
    private PasswordEncoder passwordEncoder; 
    
    @Autowired 
    private JwtUtil jwtUtil; 
    
    @PostMapping("/register") 
    public Map<String, String> register(@RequestBody Map<String, String> body) { 
        String username = body.get("username"); 
        String password = body.get("password"); 
        if (userRepository.findByUsername(username).isPresent()) { throw new RuntimeException("Username already taken"); 

        } 
        User user = new User(); 
        user.setUsername(username); 
        user.setPassword(passwordEncoder.encode(password)); 
        userRepository.save(user); 
        String token = jwtUtil.generateToken(username); 
        return Map.of("token", token, "username", username); 
    } 
    
    @PostMapping("/login") 
    public Map<String, String> login(@RequestBody Map<String, String> body) { 
        String username = body.get("username"); 
        String password = body.get("password"); 
        User user = userRepository.findByUsername(username) .orElseThrow(() -> new RuntimeException("Invalid username or password")); 
        
        if (!passwordEncoder.matches(password, user.getPassword())) { 
            throw new RuntimeException("Invalid username or password"); 
        } 
        
        String token = jwtUtil.generateToken(username); 
        return Map.of("token", token, "username", username); 
    } 
}