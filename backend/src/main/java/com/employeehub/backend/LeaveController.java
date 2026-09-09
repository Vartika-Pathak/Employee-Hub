package com.employeehub.backend; 
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.web.bind.annotation.*; 
import java.time.LocalDate; 
import java.util.List; 

@RestController 
@RequestMapping("/leave") public class LeaveController { 
    
    @Autowired 
    private LeaveRequestRepository leaveRequestRepository; 
    
    @Autowired 
    private EmployeeRepository employeeRepository; 
    
    @PostMapping("/apply") 
    public LeaveRequest applyForLeave( @RequestParam Long employeeId, @RequestParam String startDate, @RequestParam String endDate, @RequestParam String reason) { 
        Employee employee = employeeRepository.findById(employeeId) .orElseThrow(() -> new RuntimeException("Employee not found")); 
        LeaveRequest leave = new LeaveRequest( employee, LocalDate.parse(startDate), LocalDate.parse(endDate), reason ); 
        return leaveRequestRepository.save(leave); 
    } 
    
    @PostMapping("/{leaveId}/approve") 
    public LeaveRequest approveLeave(@PathVariable Long leaveId) { 
        LeaveRequest leave = leaveRequestRepository.findById(leaveId) .orElseThrow(() -> new RuntimeException("Leave request not found")); 
        leave.setStatus(LeaveStatus.APPROVED); return leaveRequestRepository.save(leave); 
    } 
    
    @PostMapping("/{leaveId}/reject") 
    public LeaveRequest rejectLeave(@PathVariable Long leaveId) { 
        LeaveRequest leave = leaveRequestRepository.findById(leaveId) .orElseThrow(() -> new RuntimeException("Leave request not found")); 
        leave.setStatus(LeaveStatus.REJECTED); 
        return leaveRequestRepository.save(leave); 
    } 
    
    @GetMapping public List<LeaveRequest> getAllLeaveRequests() { 
        return leaveRequestRepository.findAll(); 
    } 
    
    @GetMapping("/employee/{employeeId}") 
    public List<LeaveRequest> getLeaveForEmployee(@PathVariable Long employeeId) { 
        return leaveRequestRepository.findByEmployeeId(employeeId); 
    } 
} 