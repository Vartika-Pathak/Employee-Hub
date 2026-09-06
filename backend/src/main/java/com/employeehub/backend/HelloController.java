package com.employeehub.backend; 
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.web.bind.annotation.GetMapping; 
import org.springframework.web.bind.annotation.PostMapping; 
import org.springframework.web.bind.annotation.RequestBody; 
import org.springframework.web.bind.annotation.RestController; 
import java.util.List;
 
@RestController 
public class HelloController { 
    @Autowired 
    private EmployeeRepository employeeRepository; 
    
    @GetMapping("/employees") 
    public List<Employee> getEmployees() { 
        return employeeRepository.findAll(); 
    } 
    
    @PostMapping("/employees") 
    public Employee addEmployee(@RequestBody Employee employee) { 
        return employeeRepository.save(employee); 
    } 
} 