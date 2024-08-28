package com.example.crud_parc.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map; // Ensure this import is present

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.crud_parc.exception.ResourceNotFoundException;
import com.example.crud_parc.model.Computer;
import com.example.crud_parc.repository.ComputerRepository;

@RestController
@RequestMapping("api/v1/")
@CrossOrigin(origins = "http://localhost:4200")
public class ComputerController {

    @Autowired
    private ComputerRepository computerRepository;

    @GetMapping("/computers")
    public List<Computer> getAllComputers() {
        return computerRepository.findAll();
    }

    @PostMapping("/computers")
    public Computer createComputer(@RequestBody Computer computer) {
        return computerRepository.save(computer);
    }

    @GetMapping("/computers/{id}")
    public ResponseEntity<Computer> getComputerById(@PathVariable Long id) {
        Computer computer = computerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Computer not exist with id :" + id));
        return ResponseEntity.ok(computer);
    }

    @PutMapping("/computers/{id}")
    public ResponseEntity<Computer> updateComputer(@PathVariable Long id, @RequestBody Computer computerDetails) {
        Computer computer = computerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Computer not exist with id :" + id));

        computer.setModele(computerDetails.getModele());
        computer.setNom(computerDetails.getNom());
        computer.setNumSerie(computerDetails.getNumSerie());
        computer.setStatut(computerDetails.getStatut());
        computer.setTechnicienResponsable(computerDetails.getTechnicienResponsable());
        computer.setUtilisateur(computerDetails.getUtilisateur());

        Computer updatedComputer = computerRepository.save(computer);
        return ResponseEntity.ok(updatedComputer);
    }
//delete
    @DeleteMapping("/computers/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteComputer(@PathVariable Long id) {
        Computer computer = computerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Computer not exist with id :" + id));

        computerRepository.delete(computer);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
