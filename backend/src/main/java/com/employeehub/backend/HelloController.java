 package com.employeehub.backend; 
 import org.springframework.web.bind.annotation.GetMapping; 
 import org.springframework.web.bind.annotation.RestController; 
 
 @RestController 
 public class HelloController { 

    @GetMapping("/hello") 
    public String sayHello() { 
        return "Hello from your Spring Boot backend!"; 
    } 
}