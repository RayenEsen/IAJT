package com.example.crud_parc.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.crud_parc.exception.ResourceNotFoundException;
import com.example.crud_parc.model.Computer;
import com.example.crud_parc.model.ParkUser;
import com.example.crud_parc.repository.ComputerRepository;
import com.example.crud_parc.repository.ParkUserRepository;

@RestController
@RequestMapping("api/v1/")
@CrossOrigin(origins = "http://localhost:4200")
public class ComputerController {

    @Autowired
    private ComputerRepository computerRepository;

    @Autowired
    private ParkUserRepository parkUserRepository;

    // Récupérer la liste de tous les ordinateurs
    @GetMapping("/computers")
    public List<Computer> getAllComputers() {
        return computerRepository.findAll();
    }

    // Créer un nouvel ordinateur
    @PostMapping("/computers")
    public Computer createComputer(@RequestBody Computer computer) {
        // Vérifier que l'utilisateur existe
        ParkUser utilisateur = parkUserRepository.findById(computer.getUtilisateur().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé avec l'ID : " + computer.getUtilisateur().getId()));
        
        computer.setUtilisateur(utilisateur);  // Associer l'utilisateur à l'ordinateur
        return computerRepository.save(computer);
    }

    // Récupérer un ordinateur par ID
    @GetMapping("/computers/{id}")
    public ResponseEntity<Computer> getComputerById(@PathVariable Long id) {
        Computer computer = computerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Computer non trouvé avec l'ID : " + id));
        return ResponseEntity.ok(computer);
    }

 // Mettre à jour un ordinateur existant
    @PutMapping("/computers/{id}")
    public ResponseEntity<Computer> updateComputer(@PathVariable Long id, @RequestBody Computer computerDetails) {
        // Trouver l'ordinateur par ID ou lancer une exception s'il n'est pas trouvé
        Computer computer = computerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Computer non trouvé avec l'ID : " + id));

        // Mettre à jour tous les champs de l'ordinateur avec les détails fournis
        computer.setNom(computerDetails.getNom());
        computer.setLieu(computerDetails.getLieu());  // Assurez-vous que ce champ est bien défini
        computer.setTechnicienResponsable(computerDetails.getTechnicienResponsable());
        computer.setGroupeResponsable(computerDetails.getGroupeResponsable());  // Assurez-vous que ce champ est bien défini
        computer.setUsagerNumero(computerDetails.getUsagerNumero());  // Assurez-vous que ce champ est bien défini
        computer.setUsager(computerDetails.getUsager());  // Assurez-vous que ce champ est bien défini
        computer.setUtilisateur(computerDetails.getUtilisateur());  // Assurez-vous que ce champ est bien défini
        computer.setGroupe(computerDetails.getGroupe());  // Assurez-vous que ce champ est bien défini
        computer.setCommentaires(computerDetails.getCommentaires());  // Assurez-vous que ce champ est bien défini
        computer.setStatut(computerDetails.getStatut());
        computer.setTypeOrdinateur(computerDetails.getTypeOrdinateur());  // Assurez-vous que ce champ est bien défini
        computer.setFabricant(computerDetails.getFabricant());  // Assurez-vous que ce champ est bien défini
        computer.setModele(computerDetails.getModele());
        computer.setNumeroSerie(computerDetails.getNumeroSerie());
        computer.setNumeroInventaire(computerDetails.getNumeroInventaire());  // Assurez-vous que ce champ est bien défini
        computer.setReseau(computerDetails.getReseau());  // Assurez-vous que ce champ est bien défini
        computer.setUuid(computerDetails.getUuid());  // Assurez-vous que ce champ est bien défini
        computer.setSourceMiseAJour(computerDetails.getSourceMiseAJour());  // Assurez-vous que ce champ est bien défini
        computer.setImageUrl(computerDetails.getImageUrl());  // Assurez-vous que ce champ est bien défini

        // Sauvegarder l'ordinateur mis à jour dans le dépôt
        Computer updatedComputer = computerRepository.save(computer);
        return ResponseEntity.ok(updatedComputer);
    }

    // Supprimer un ordinateur
    @DeleteMapping("/computers/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteComputer(@PathVariable Long id) {
        Computer computer = computerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Computer non trouvé avec l'ID : " + id));

        computerRepository.delete(computer);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
