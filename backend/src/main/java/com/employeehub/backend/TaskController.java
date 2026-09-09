package com.employeehub.backend; 
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.web.bind.annotation.*; 
import java.util.List; 

@RestController 
@RequestMapping("/tasks") 

public class TaskController { 
    
    @Autowired 
    private TaskRepository taskRepository; 
    
    @GetMapping 
    public List<Task> getTasks(@RequestParam(required = false) String status) { 
        List<Task> all = taskRepository.findAll(); 
        return all.stream() .filter(t -> status == null || status.isBlank() || status.equals(t.getStatus())) .toList(); 
    }
    
    @PostMapping 
    public Task createTask(@RequestBody Task task) { 
        if (task.getStatus() == null) task.setStatus("todo"); 
        if (task.getPriority() == null) task.setPriority("medium"); 
        return taskRepository.save(task); 
    }
    
    @PutMapping("/{id}") 
    public Task updateTask(@PathVariable Long id, @RequestBody Task updated) { 
        Task task = taskRepository.findById(id) .orElseThrow(() -> new RuntimeException("Task not found")); 
        if (updated.getTitle() != null) task.setTitle(updated.getTitle()); 
        if (updated.getAssignee() != null) task.setAssignee(updated.getAssignee()); 
        if (updated.getDueDate() != null) task.setDueDate(updated.getDueDate()); 
        if (updated.getStatus() != null) task.setStatus(updated.getStatus()); 
        if (updated.getPriority() != null) task.setPriority(updated.getPriority()); 
        if (updated.getCategory() != null) task.setCategory(updated.getCategory()); 
        return taskRepository.save(task); 
    }
}