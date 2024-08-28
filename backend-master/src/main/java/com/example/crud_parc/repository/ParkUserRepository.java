package com.example.crud_parc.repository;

import com.example.crud_parc.model.ParkUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParkUserRepository extends JpaRepository<ParkUser, Long> {
  
}
