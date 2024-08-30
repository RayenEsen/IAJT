package com.example.crud_parc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.crud_parc.model.Computer;
@Repository


public interface ComputerRepository extends JpaRepository<Computer,Long> {

}
