package com.employeehub.backend; 
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.web.bind.annotation.*; 
import java.util.List; 

@RestController 
@RequestMapping("/employees/{employeeId}/documents") public class DocumentController { 
    @Autowired 
    private DocumentRepository documentRepository; 
    
    @Autowired 
    private EmployeeRepository employeeRepository; 
    
    @GetMapping 
    public List<Document> getDocuments(@PathVariable Long employeeId) { 
        return documentRepository.findByEmployeeId(employeeId); 
    }
    
    @PostMapping 
    public Document createDocument(@PathVariable Long employeeId, @RequestBody Document document) { 
        Employee employee = employeeRepository.findById(employeeId) .orElseThrow(() -> new RuntimeException("Employee not found")); 
        document.setEmployee(employee); 
        if (document.getStatus() == null) document.setStatus("pending"); 
        return documentRepository.save(document); 
    } 
}