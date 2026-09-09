package com.employeehub.backend; 
import jakarta.persistence.Entity; 
import jakarta.persistence.GeneratedValue; 
import jakarta.persistence.GenerationType; 
import jakarta.persistence.Id; 
import java.time.LocalDate; 

@Entity 
public class Employee { 
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id; 
    private String name;
    private String email; 
    private String role; 
    private String department; 
    private String location; 
    private String status = "active"; 
    private LocalDate startDate; 
    private String phone; 
    private String manager; 
    private String initials; 
    private String color; 
    public Employee() {

    } 
    public Long getId() { 
        return id; 
    } 
    
    public String getName() { 
        return name; 
    } 
    
    public void setName(String name) { 
        this.name = name; 
    }
    
    public String getEmail() { 
        return email; 
    }
    
    public void setEmail(String email) { 
        this.email = email; 
    }
    
    public String getRole() { 
        return role; 
    }
    
    public void setRole(String role) { 
        this.role = role; 
    }
    
    public String getDepartment() { 
        return department; 
    }
    
    public void setDepartment(String department) { 
        this.department = department; 
    }
    
    public String getLocation() { 
        return location; 
    }
    
    public void setLocation(String location) { 
        this.location = location; 
    }
    
    public String getStatus() { 
        return status; 
    }
    
    public void setStatus(String status) { 
        this.status = status; 
    }
    
    public LocalDate getStartDate() { 
        return startDate; 
    }
    
    public void setStartDate(LocalDate startDate) { 
        this.startDate = startDate; 
    }
    
    public String getPhone() { 
        return phone; 
    }
    
    public void setPhone(String phone) { 
        this.phone = phone; 
    }
    
    public String getManager() { 
        return manager; 
    } 
    
    public void setManager(String manager) { 
        this.manager = manager; 
    }
    
    public String getInitials() { 
        return initials; 
    }
    
    public void setInitials(String initials) { 
        this.initials = initials; 
    }
    
    public String getColor() { 
        return color; 
    } 
    
    public void setColor(String color) { 
        this.color = color; 
    }
}