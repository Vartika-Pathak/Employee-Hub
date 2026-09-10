package com.employeehub.backend; 
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.web.bind.annotation.GetMapping; 
import org.springframework.web.bind.annotation.RequestMapping; 
import org.springframework.web.bind.annotation.RestController; 
import java.time.LocalDate; 
import java.util.List; 

@RestController 
@RequestMapping("/dashboard") 
public class DashboardController { 
    
    @Autowired 
    private EmployeeRepository employeeRepository; 
    
    @Autowired 
    private TaskRepository taskRepository; 
    
    @Autowired 
    private AttendanceRepository attendanceRepository; 
    
    @GetMapping("/summary") 
    public SummaryDtos.DashboardSummary getSummary() { 
        long totalEmployees = employeeRepository.count(); 
        LocalDate thirtyDaysAgo = LocalDate.now().minusDays(30); 
        long newHires = employeeRepository.findAll().stream() .filter(e -> e.getStartDate() != null && !e.getStartDate().isBefore(thirtyDaysAgo)) .count(); 
        LocalDate today = LocalDate.now(); 
        long presentToday = attendanceRepository.findAll().stream() .filter(a -> a.getPunchIn() != null && a.getPunchIn().toLocalDate().equals(today)) .map(a -> a.getEmployee().getId()) .distinct() .count(); 
        double attendanceRate = totalEmployees == 0 ? 0 : Math.round((presentToday * 100.0 / totalEmployees) * 10) / 10.0; 
        long openTasks = taskRepository.findAll().stream() .filter(t -> !"done".equals(t.getStatus())) .count(); 
        return new SummaryDtos.DashboardSummary(totalEmployees, 0, newHires, 0, attendanceRate, openTasks); 
    } 
    
    @GetMapping("/activity") 
    public List<SummaryDtos.Activity> getActivity() { 
        return List.of(); 
    } 
}