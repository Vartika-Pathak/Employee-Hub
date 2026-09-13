package com.employeehub.backend; 
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.stereotype.Component; 

@Component 
public class ActivityLogger { 
    
    @Autowired 
    private ActivityLogRepository activityLogRepository; 
    
    public void log(String initials, String color, String text, String kind) { 
        activityLogRepository.save(new ActivityLog(initials, color, text, kind)); 
    } 
    
    public static String initialsFrom(String name) { 
        if (name == null || name.isBlank()) return "?"; 
        String[] parts = name.trim().split("\\s+"); 
        StringBuilder sb = new StringBuilder(); 
        for (String p : parts) { 
            if (!p.isEmpty()) sb.append(Character.toUpperCase(p.charAt(0))); 
            if (sb.length() >= 2) break; 
        } 
        return sb.toString(); 
    } 
}