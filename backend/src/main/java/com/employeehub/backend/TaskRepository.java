package com.employeehub.backend; 
import org.springframework.data.jpa.repository.JpaRepository; 

public interface TaskRepository extends JpaRepository<Task, Long> { } 