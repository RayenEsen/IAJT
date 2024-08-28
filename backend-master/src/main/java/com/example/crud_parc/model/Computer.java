package com.example.crud_parc.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "computers")
public class Computer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
private long id;
@Column(name = "nom")
private String nom;
@Column(name = "statut")
private String statut ;
@Column(name = "commentaire")
private String commentaire;
@Column(name = "num_serie")
private String numSerie;
@Column(name = "modele")
private String modele;
@Column(name = "utilisateur")
private String  utilisateur;
@Column(name = "technicien_responsable")
private String technicienResponsable ;
public long getId() {
    return id;
}
public void setId(long id) {
    this.id = id;
}
public String getNom() {
    return nom;
}
public void setNom(String nom) {
    this.nom = nom;
}
public String getStatut() {
    return statut;
}
public void setStatut(String statut) {
    this.statut = statut;
}
public String getCommentaire() {
    return commentaire;
}
public void setCommentaire(String commentaire) {
    this.commentaire = commentaire;
}
public String getNumSerie() {
    return numSerie;
}
public void setNumSerie(String numSerie) {
    this.numSerie = numSerie;
}
public String getModele() {
    return modele;
}
public Computer () {

}
public Computer(String nom, String statut, String commentaire, String numSerie, String modele, String utilisateur,
        String technicienResponsable) {
    this.nom = nom;
    this.statut = statut;
    this.commentaire = commentaire;
    this.numSerie = numSerie;
    this.modele = modele;
    this.utilisateur = utilisateur;
    this.technicienResponsable = technicienResponsable;
}
public void setModele(String modele) {
    this.modele = modele;
}
public String getUtilisateur() {
    return utilisateur;
}
public void setUtilisateur(String utilisateur) {
    this.utilisateur = utilisateur;
}
public String getTechnicienResponsable() {
    return technicienResponsable;
}
public void setTechnicienResponsable(String technicienResponsable) {
    this.technicienResponsable = technicienResponsable;
}
}
