package com.employeehub.backend; 
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.web.bind.annotation.*; 
import java.time.LocalDateTime;
import java.util.List; 
import java.time.LocalDate; 
import java.time.format.TextStyle; 
import java.util.ArrayList; 
import java.util.Locale; 

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

    @GetMapping("/summary") 
    public SummaryDtos.AttendanceSummaryDto getAttendanceSummary() { 
        long totalEmployees = employeeRepository.count(); 
        List<Attendance> allAttendance = attendanceRepository.findAll(); 
        LocalDate today = LocalDate.now(); 
        long presentToday = allAttendance.stream() .filter(a -> a.getPunchIn() != null && a.getPunchIn().toLocalDate().equals(today)) .map(a -> a.getEmployee().getId()) .distinct() .count(); 
        long absentToday = Math.max(0, totalEmployees - presentToday); 
        double rate = totalEmployees == 0 ? 0 : Math.round((presentToday * 100.0 / totalEmployees) * 10) / 10.0; 
        List<SummaryDtos.TrendPoint> trend = new ArrayList<>(); 

        for (int i = 6; i >= 0; i--) { 
            LocalDate day = today.minusDays(i); 
            long presentThatDay = allAttendance.stream() .filter(a -> a.getPunchIn() != null && a.getPunchIn().toLocalDate().equals(day)) .map(a -> a.getEmployee().getId()) .distinct() .count(); 
            double dayRate = totalEmployees == 0 ? 0 : Math.round((presentThatDay * 100.0 / totalEmployees) * 10) / 10.0; String label = day.getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.ENGLISH); 
            trend.add(new SummaryDtos.TrendPoint(label, dayRate)); 
        }
        
        return new SummaryDtos.AttendanceSummaryDto(rate, presentToday, absentToday, 0, trend); 
    }
}