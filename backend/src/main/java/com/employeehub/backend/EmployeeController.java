package com.employeehub.backend; 
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.web.bind.annotation.*; 
import java.util.List; 

@RestController 
@RequestMapping("/employees") 
public class EmployeeController { 
    
    @Autowired 
    private EmployeeRepository employeeRepository; 
    
    @GetMapping 
    public List<Employee> getEmployees( 
        
        @RequestParam(required = false) String search, 
        
        @RequestParam(required = false) String status) { 
            List<Employee> all = employeeRepository.findAll(); 
            return all.stream() .filter(e -> search == null || search.isBlank() || (e.getName() != null && e.getName().toLowerCase().contains(search.toLowerCase())) || (e.getRole() != null && e.getRole().toLowerCase().contains(search.toLowerCase())) || (e.getDepartment() != null && e.getDepartment().toLowerCase().contains(search.toLowerCase()))) .filter(e -> status == null || status.isBlank() || status.equals(e.getStatus())) .toList(); 
        }
        
        @GetMapping("/{id}") 
        public Employee getEmployee(@PathVariable Long id) { 
            return employeeRepository.findById(id) .orElseThrow(() -> new RuntimeException("Employee not found")); 
        }
        
        @PostMapping public Employee createEmployee(@RequestBody Employee employee) { 
            return employeeRepository.save(employee); 
        }
        
        @PutMapping("/{id}") 
        public Employee updateEmployee(@PathVariable Long id, @RequestBody Employee updated) { 
            Employee employee = employeeRepository.findById(id) .orElseThrow(() -> new RuntimeException("Employee not found")); 
            employee.setName(updated.getName()); 
            employee.setEmail(updated.getEmail()); 
            employee.setRole(updated.getRole()); 
            employee.setDepartment(updated.getDepartment()); 
            employee.setLocation(updated.getLocation()); 
            employee.setStatus(updated.getStatus()); 
            employee.setStartDate(updated.getStartDate()); 
            employee.setPhone(updated.getPhone()); 
            employee.setManager(updated.getManager()); 
            employee.setInitials(updated.getInitials()); 
            employee.setColor(updated.getColor()); 
            return employeeRepository.save(employee); 
        }
}