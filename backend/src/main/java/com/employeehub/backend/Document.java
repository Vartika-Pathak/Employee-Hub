package com.employeehub.backend; 
import jakarta.persistence.*; 

@Entity 
public class Document { 
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    
    private Long id; 
    
    @ManyToOne 
    
    private Employee employee; 
    private String name; 
    private String type; 
    private String size; 
    private String objectPath; 
    private String status = "pending"; 
    
    public Document() { } 
    
    public Long getId() {
         return id; 
    }
    
    public Employee getEmployee() { 
        return employee; 
    }
    
    public void setEmployee(Employee employee) { 
        this.employee = employee; 
    } 
    
    public String getName() { 
        return name; 
    } 
    
    public void setName(String name) { 
        this.name = name; 
    } 
    
    public String getType() { 
        return type; 
    } 
    
    public void setType(String type) { 
        this.type = type; 
    }
    
    public String getSize() { 
        return size; 
    }
    
    public void setSize(String size) { 
        this.size = size; 
    }
    
    public String getObjectPath() { 
        return objectPath; 
    }
    
    public void setObjectPath(String objectPath) { 
        this.objectPath = objectPath; 
    }
    
    public String getStatus() { 
        return status; 
    }
    
    public void setStatus(String status) { 
        this.status = status; 
    } 
} 