package com.employeehub.backend; 
import org.springframework.data.jpa.repository.JpaRepository; 
import java.util.List; 

public interface OnboardingItemRepository extends JpaRepository<OnboardingItem, Long> { 
    List<OnboardingItem> findByEmployeeId(Long employeeId); 
}