package com.employeehub.backend; 
import jakarta.persistence.*; 
import java.time.LocalDate; 

@Entity 
public class OnboardingItem { 
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    
    private Long id; 
    
    @ManyToOne 
    private Employee employee; 
    private String title; 
    private String category; 
    private LocalDate dueDate; 
    private String status = "pending"; 
    
    public OnboardingItem() { 

    } 
    
    public Long getId() { 
        return id; 
    } 
    
    public Employee getEmployee() { 
        return employee; 
    }
    
    public void setEmployee(Employee employee) { 
        this.employee = employee; 
    }
    
    public String getTitle() { 
        return title; 
    }
    
    public void setTitle(String title) { 
        this.title = title; 
    } 
    
    public String getCategory() { 
        return category; 
    }
    
    public void setCategory(String category) { 
        this.category = category; 
    }
    
    public LocalDate getDueDate() { 
        return dueDate; 
    }
    
    public void setDueDate(LocalDate dueDate) { 
        this.dueDate = dueDate; 
    }
    
    public String getStatus() { 
        return status; 
    }
    
    public void setStatus(String status) { 
        this.status = status; 
    }
}