package com.example.crud_parc.controller;

import com.example.crud_parc.model.User;
import com.example.crud_parc.service.UserService;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:4200")

public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/users/register")
    public ResponseEntity<?> registerUser(@RequestBody User newUser) {
        // Check if a user with the given email already exists
        Optional<User> existingUser = userService.findByEmail(newUser.getEmail());
        if (existingUser.isPresent()) {
            // If user exists, return a response indicating the conflict
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("L'utilisateur avec cet email existe déjà.");
        }

        // If no user exists, proceed with registration
        User registeredUser = userService.registerUser(newUser);
        return ResponseEntity.ok(registeredUser);
    }


    @PostMapping("/users/login")
    public ResponseEntity<String> loginUser(@RequestParam String email, @RequestParam String password) {
        try {
            Optional<User> authenticatedUser = userService.authenticate(email, password);
            if (authenticatedUser.isPresent()) {
                return ResponseEntity.ok("Utilisateur authentifié avec succès !");
            } else {
                return ResponseEntity.badRequest().body("Email ou mot de passe incorrect.");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erreur lors de l'authentification : " + e.getMessage());
        }
    }
}
