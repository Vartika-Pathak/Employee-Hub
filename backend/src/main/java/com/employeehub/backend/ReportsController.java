package com.employeehub.backend; 
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.web.bind.annotation.GetMapping; 
import org.springframework.web.bind.annotation.RequestMapping; 
import org.springframework.web.bind.annotation.RestController; 
import java.time.LocalDate; 
import java.time.format.TextStyle; 
import java.util.*; 
import java.util.stream.Collectors; 

@RestController 
@RequestMapping("/reports") 
public class ReportsController { 
    
    @Autowired 
    private EmployeeRepository employeeRepository; 
    
    @GetMapping("/summary") 
    public SummaryDtos.ReportsSummaryDto getReportsSummary() { 
        List<Employee> employees = employeeRepository.findAll(); 
        long headcount = employees.size(); 
        long activeCount = employees.stream().filter(e -> "active".equals(e.getStatus())).count(); 
        double retention = headcount == 0 ? 0 : Math.round((activeCount * 100.0 / headcount) * 10) / 10.0; 
        Map<String, Long> deptMap = employees.stream() .filter(e -> e.getDepartment() != null && !e.getDepartment().isBlank()) .collect(Collectors.groupingBy(Employee::getDepartment, Collectors.counting())); 
        List<SummaryDtos.DepartmentCount> departments = deptMap.entrySet().stream() .map(entry -> new SummaryDtos.DepartmentCount(entry.getKey(), entry.getValue())) .toList(); List<SummaryDtos.HiringPoint> hiring = new ArrayList<>(); 
        LocalDate now = LocalDate.now(); for (int i = 5; i >= 0; i--) {
            LocalDate month = now.minusMonths(i); 
            long count = employees.stream() .filter(e -> e.getStartDate() != null && e.getStartDate().getMonth() == month.getMonth() && e.getStartDate().getYear() == month.getYear()) .count(); 
            String label = month.getMonth().getDisplayName(TextStyle.SHORT, Locale.ENGLISH); 
            hiring.add(new SummaryDtos.HiringPoint(label, count)); 
        }
        
        return new SummaryDtos.ReportsSummaryDto(headcount, retention, departments, hiring); 
    }
}