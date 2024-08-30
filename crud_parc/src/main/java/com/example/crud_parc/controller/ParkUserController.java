package com.example.crud_parc.controller;

import com.example.crud_parc.model.ParkUser;
import com.example.crud_parc.service.ParkUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/")

@CrossOrigin(origins = "http://localhost:4200")
public class ParkUserController {
    @Autowired
    private ParkUserService parkUserService;

    // Récupère tous les utilisateurs
    @GetMapping("/parkusers")
    public List<ParkUser> getAllUsers() {
        return parkUserService.findAllUsers();
    }

    // Récupère un utilisateur spécifique par ID
    @GetMapping("/parkusers/{id}")
    public ParkUser getUserById(@PathVariable Long id) {
        return parkUserService.findUserById(id);
    }

    // Crée ou met à jour un utilisateur
    @PostMapping("/parkusers")
    public ParkUser createUser(@RequestBody ParkUser user) {
        return parkUserService.saveUser(user);
    }

    // Supprime un utilisateur
    @DeleteMapping("/parkusers/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        parkUserService.deleteUser(id);
        return ResponseEntity.ok().build();
    }
}
