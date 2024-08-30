package com.example.crud_parc.controller;

import com.example.crud_parc.model.User;
import com.example.crud_parc.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/users/register")
    public ResponseEntity<?> registerUser(@RequestBody User newUser) {
        try {
            if (userService.userExists(newUser.getEmail())) {
                return ResponseEntity.badRequest().body("L'utilisateur existe déjà");
            }
            User registeredUser = userService.registerUser(newUser);
            return ResponseEntity.ok(registeredUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erreur lors de l'inscription : " + e.getMessage());
        }
    }

    @PostMapping("/users/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestParam String email, @RequestParam String password) {
        try {
            Optional<User> authenticatedUser = userService.authenticate(email, password);
            Map<String, Object> response = new HashMap<>();
            if (authenticatedUser.isPresent()) {
                response.put("message", "Utilisateur authentifié avec succès !");
                response.put("user", authenticatedUser.get());
                return ResponseEntity.ok(response);
            } else {
                response.put("message", "Email ou mot de passe incorrect.");
                return ResponseEntity.badRequest().body(response);
            }
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "Erreur lors de l'authentification : " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
}
