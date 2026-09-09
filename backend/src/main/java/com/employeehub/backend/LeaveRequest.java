package com.employeehub.backend; 
import jakarta.persistence.*; 
import java.time.LocalDate; 

@Entity 

public class LeaveRequest { 
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    
    private Long id; 
    
    @ManyToOne 
    private Employee employee; 
    private LocalDate startDate; 
    private LocalDate endDate; 
    private String reason; 
    
    @Enumerated(EnumType.STRING) 
    private LeaveStatus status = LeaveStatus.PENDING; 
    public LeaveRequest() { 

    } 
    
    public LeaveRequest(Employee employee, LocalDate startDate, LocalDate endDate, String reason) { 
        this.employee = employee; 
        this.startDate = startDate; 
        this.endDate = endDate; 
        this.reason = reason; 
    } 
    
    public Long getId() { 
        return id; 
    } 
    
    public Employee getEmployee() { 
        return employee; 
    } 
    
    public LocalDate getStartDate() { 
        return startDate; 
    } 

    public LocalDate getEndDate() { 
        return endDate; 
    } 
    
    public String getReason() { 
        return reason; 
    }
    
    public LeaveStatus getStatus() { 
        return status; 
    } 
    
    public void setStatus(LeaveStatus status) { 
        this.status = status; 
    } 
}