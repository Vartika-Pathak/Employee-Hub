package com.employeehub.backend; 
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.web.bind.annotation.GetMapping; 
import org.springframework.web.bind.annotation.RequestMapping; 
import org.springframework.web.bind.annotation.RestController; 
import java.time.LocalDate; 
import java.util.List;
import java.time.Duration; 
import java.time.LocalDateTime;

@RestController 
@RequestMapping("/dashboard") 
public class DashboardController { 
    
    @Autowired 
    private EmployeeRepository employeeRepository; 
    
    @Autowired 
    private TaskRepository taskRepository; 
    
    @Autowired 
    private AttendanceRepository attendanceRepository;

    @Autowired 
    private ActivityLogRepository activityLogRepository;

    
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
        return activityLogRepository.findTop10ByOrderByCreatedAtDesc().stream() .map(a -> new SummaryDtos.Activity( 
            a.getId(), 
            a.getInitials(), 
            a.getColor(), 
            a.getText(), 
            formatRelativeTime(a.getCreatedAt()), 
            a.getKind() )) .toList(); 
        } 
        
        private String formatRelativeTime(LocalDateTime time) { 
            Duration duration = Duration.between(time, LocalDateTime.now()); 
            long minutes = duration.toMinutes(); 
            if (minutes < 1) return "just now"; 
            if (minutes < 60) return minutes + "m ago"; 
            long hours = duration.toHours(); 
            if (hours < 24) return hours + "h ago"; 
            long days = duration.toDays(); 
            return days + "d ago"; 
        } 
}