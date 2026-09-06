package com.employeehub.backend; 
import jakarta.persistence.Entity; 
import jakarta.persistence.GeneratedValue; 
import jakarta.persistence.GenerationType; 
import jakarta.persistence.Id; 

@Entity 
public class Employee { 
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    
    private Long id; 
    private String name; 
    private String role; 
    
    public Employee() { } 
    
    public Employee(String name, String role) { 
        this.name = name; 
        this.role = role; 
    }
    
    public Long getId() { 
        return id; 
    } 
    
    public String getName() { 
        return name; 
    } 
    
    public String getRole() { 
        return role; 
    } 
}