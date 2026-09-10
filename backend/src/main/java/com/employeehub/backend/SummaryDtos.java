package com.employeehub.backend; 
import java.util.List; 

public class SummaryDtos { 
    public record DashboardSummary(long totalEmployees, long employeeChange, long newHires, long newHiresChange, double attendanceRate, long openTasks) {} 
    
    public record TrendPoint(String day, double rate) {} 
    
    public record AttendanceSummaryDto(double rate, long present, long absent, long late, List<TrendPoint> trend) {} 
    
    public record DepartmentCount(String department, long count) {} 
    
    public record HiringPoint(String label, long value) {} 
    
    public record ReportsSummaryDto(long headcount, double retention, List<DepartmentCount> departments, List<HiringPoint> hiring) {} 
    
    public record Activity(long id, String initials, String color, String text, String timestamp, String kind) {} 
}