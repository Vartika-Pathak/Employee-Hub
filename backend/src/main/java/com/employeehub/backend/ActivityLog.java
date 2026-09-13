package com.employeehub.backend; 
import jakarta.persistence.*; 
import java.time.LocalDateTime; 

@Entity 
public class ActivityLog { 
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long id; 
    private String initials; 
    private String color; 
    private String text; 
    private String kind; 
    private LocalDateTime createdAt = LocalDateTime.now(); 
    
    public ActivityLog() { } 
    public ActivityLog(String initials, String color, String text, String kind) { 
        this.initials = initials; 
        this.color = color; 
        this.text = text; 
        this.kind = kind; 
        this.createdAt = LocalDateTime.now(); 
    } 
    
    public Long getId() { 
        return id; 
    } 
    
    public String getInitials() { 
        return initials; 
    } 
    
    public String getColor() { 
        return color; 
    }
    
    public String getText() { 
        return text; 
    } 
    
    public String getKind() { 
        return kind; 
    } 
    
    public LocalDateTime getCreatedAt() { 
        return createdAt; 
    } 
}