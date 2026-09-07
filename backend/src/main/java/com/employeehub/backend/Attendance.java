package com.employeehub.backend; 
import jakarta.persistence.Entity; 
import jakarta.persistence.GeneratedValue; 
import jakarta.persistence.GenerationType; 
import jakarta.persistence.Id; 
import jakarta.persistence.ManyToOne; 
import java.time.LocalDateTime; 

@Entity 
public class Attendance { 
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    
    private Long id; 
    
    @ManyToOne 
    
    private Employee employee; 
    private LocalDateTime punchIn; 
    private LocalDateTime punchOut; 
    public Attendance() { } 
    
    public Attendance(Employee employee, LocalDateTime punchIn) { 
        this.employee = employee; 
        this.punchIn = punchIn; 
    } 
    
    public Long getId() { 
        return id; 
    }
    
    public Employee getEmployee() { 
        return employee; 
    }
    
    public LocalDateTime getPunchIn() { 
        return punchIn; 
    } 

    public LocalDateTime getPunchOut() { 
        return punchOut; 
    } 
    
    public void setPunchOut(LocalDateTime punchOut) { 
        this.punchOut = punchOut; 
    } 
} 