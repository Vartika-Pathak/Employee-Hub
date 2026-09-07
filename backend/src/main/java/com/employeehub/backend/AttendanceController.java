package com.employeehub.backend; 
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.web.bind.annotation.*; 
import java.time.LocalDateTime;
import java.util.List; 

@RestController 
@RequestMapping("/attendance") 

public class AttendanceController { 
    @Autowired 
    private AttendanceRepository attendanceRepository; 
    
    @Autowired 
    private EmployeeRepository employeeRepository; 
    
    @PostMapping("/punch-in") 
    public Attendance punchIn(@RequestParam Long employeeId) { 
        Employee employee = employeeRepository.findById(employeeId) .orElseThrow(() -> new RuntimeException("Employee not found")); 
        Attendance attendance = new Attendance(employee, LocalDateTime.now()); return attendanceRepository.save(attendance); 
    } 
    
    @PostMapping("/punch-out") 
    public Attendance punchOut(@RequestParam Long attendanceId) { 
        Attendance attendance = attendanceRepository.findById(attendanceId) .orElseThrow(() -> new RuntimeException("Attendance record not found")); 
        attendance.setPunchOut(LocalDateTime.now()); return attendanceRepository.save(attendance); 
    }
    
    @GetMapping public List<Attendance> getAllAttendance() { 
        return attendanceRepository.findAll(); 
    }
    
    @GetMapping("/employee/{employeeId}") 
    public List<Attendance> getAttendanceForEmployee(@PathVariable Long employeeId) { 
        return attendanceRepository.findByEmployeeId(employeeId); 
    } 
}