package com.employeehub.backend; 
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.web.bind.annotation.*; 
import java.util.List; 

@RestController 
@RequestMapping("/employees/{employeeId}/onboarding") 
public class OnboardingController { 
    
    @Autowired 
    private OnboardingItemRepository onboardingItemRepository; 
    
    @Autowired 
    private EmployeeRepository employeeRepository; 
    
    @GetMapping 
    public List<OnboardingItem> getOnboardingItems(@PathVariable Long employeeId) { 
        return onboardingItemRepository.findByEmployeeId(employeeId); 
    }
    
    @PostMapping 
    public OnboardingItem createOnboardingItem(@PathVariable Long employeeId, @RequestBody OnboardingItem item) { 
        Employee employee = employeeRepository.findById(employeeId) .orElseThrow(() -> new RuntimeException("Employee not found")); 
        item.setEmployee(employee); 
        if (item.getStatus() == null) item.setStatus("pending"); 
        return onboardingItemRepository.save(item); 
    }
    
    @PutMapping("/{itemId}") 
    public OnboardingItem updateOnboardingItem(@PathVariable Long employeeId, @PathVariable Long itemId, @RequestBody OnboardingItem updated) { 
        OnboardingItem item = onboardingItemRepository.findById(itemId) .orElseThrow(() -> new RuntimeException("Onboarding item not found")); 
        if (updated.getTitle() != null) item.setTitle(updated.getTitle()); 
        if (updated.getCategory() != null) item.setCategory(updated.getCategory()); 
        if (updated.getDueDate() != null) item.setDueDate(updated.getDueDate()); 
        if (updated.getStatus() != null) item.setStatus(updated.getStatus()); 
        return onboardingItemRepository.save(item); 
    } 
} 