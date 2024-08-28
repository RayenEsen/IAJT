package com.example.crud_parc.service;

import com.example.crud_parc.model.ParkUser;
import com.example.crud_parc.repository.ParkUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParkUserService {
    @Autowired
    private ParkUserRepository parkUserRepository;

    // Récupère tous les utilisateurs
    public List<ParkUser> findAllUsers() {
        return parkUserRepository.findAll();
    }

    // Trouve un utilisateur par son ID
    public ParkUser findUserById(Long id) {
        return parkUserRepository.findById(id).orElse(null);
    }

    // Enregistre ou met à jour un utilisateur
    public ParkUser saveUser(ParkUser user) {
        return parkUserRepository.save(user);
    }

    // Supprime un utilisateur par son ID
    public void deleteUser(Long id) {
        parkUserRepository.deleteById(id);
    }
}
