package com.employeehub.backend; 
import jakarta.persistence.Entity; 
import jakarta.persistence.GeneratedValue; 
import jakarta.persistence.GenerationType; 
import jakarta.persistence.Id; 
import java.time.LocalDate; 

@Entity 
public class Task { 
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    
    private Long id; 
    private String title; 
    private String assignee; 
    private LocalDate dueDate; 
    private String status; 
    private String priority; 
    private String category; 
    
    public Task() { 

    } 
    
    public Long getId() { 
        return id; 
    }
    
    public String getTitle() { 
        return title; 
    }
    
    public void setTitle(String title) { 
        this.title = title; 
    }
    
    public String getAssignee() { 
        return assignee; 
    }
    public void setAssignee(String assignee) { 
        this.assignee = assignee; 
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
    public String getPriority() { 
        return priority; 
    }
    public void setPriority(String priority) { 
        this.priority = priority; 
    }
    public String getCategory() { 
        return category; 
    }
    public void setCategory(String category) { 
        this.category = category; 
    }
}