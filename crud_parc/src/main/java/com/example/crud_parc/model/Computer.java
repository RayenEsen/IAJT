package com.example.crud_parc.model;

import jakarta.persistence.*;

@Entity
@Table(name = "computers")
public class Computer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "lieu")
    private String lieu;

    @Column(name = "technicien_responsable")
    private String technicienResponsable;

    @Column(name = "groupe_responsable")
    private String groupeResponsable;

    @Column(name = "usager_numero")
    private String usagerNumero;

    @Column(name = "usager")
    private String usager;

    @OneToOne
    @JoinColumn(name = "utilisateur_id")
    private ParkUser utilisateur;

    @Column(name = "groupe")
    private String groupe;

    @Column(name = "commentaires")
    private String commentaires;

    @Column(name = "statut")
    private String statut;

    @Column(name = "type_ordinateur")
    private String typeOrdinateur;

    @Column(name = "fabricant")
    private String fabricant;

    @Column(name = "modele")
    private String modele;

    @Column(name = "numero_serie")
    private String numeroSerie;

    @Column(name = "numero_inventaire")
    private String numeroInventaire;

    @Column(name = "reseau")
    private String reseau;

    @Column(name = "uuid")
    private String uuid;

    @Column(name = "source_mise_a_jour")
    private String sourceMiseAJour;

    @Column(name = "image_url") // Assuming 'imageurl' corresponds to 'image_url' in the database
    private String imageUrl;

    // Constructors, getters, and setters

    public Computer() {}

    public Computer(String nom, String lieu, String technicienResponsable, String groupeResponsable,
                    String usagerNumero, String usager, ParkUser utilisateur, String groupe,
                    String commentaires, String statut, String typeOrdinateur, String fabricant,
                    String modele, String numeroSerie, String numeroInventaire, String reseau,
                    String uuid, String sourceMiseAJour, String imageUrl) {
        this.nom = nom;
        this.lieu = lieu;
        this.technicienResponsable = technicienResponsable;
        this.groupeResponsable = groupeResponsable;
        this.usagerNumero = usagerNumero;
        this.usager = usager;
        this.utilisateur = utilisateur;
        this.groupe = groupe;
        this.commentaires = commentaires;
        this.statut = statut;
        this.typeOrdinateur = typeOrdinateur;
        this.fabricant = fabricant;
        this.modele = modele;
        this.numeroSerie = numeroSerie;
        this.numeroInventaire = numeroInventaire;
        this.reseau = reseau;
        this.uuid = uuid;
        this.sourceMiseAJour = sourceMiseAJour;
        this.imageUrl = imageUrl;
    }

    // Getters and setters for all fields

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

    public String getLieu() {
        return lieu;
    }

    public void setLieu(String lieu) {
        this.lieu = lieu;
    }

    public String getTechnicienResponsable() {
        return technicienResponsable;
    }

    public void setTechnicienResponsable(String technicienResponsable) {
        this.technicienResponsable = technicienResponsable;
    }

    public String getGroupeResponsable() {
        return groupeResponsable;
    }

    public void setGroupeResponsable(String groupeResponsable) {
        this.groupeResponsable = groupeResponsable;
    }

    public String getUsagerNumero() {
        return usagerNumero;
    }

    public void setUsagerNumero(String usagerNumero) {
        this.usagerNumero = usagerNumero;
    }

    public String getUsager() {
        return usager;
    }

    public void setUsager(String usager) {
        this.usager = usager;
    }

    public ParkUser getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(ParkUser utilisateur) {
        this.utilisateur = utilisateur;
    }

    public String getGroupe() {
        return groupe;
    }

    public void setGroupe(String groupe) {
        this.groupe = groupe;
    }

    public String getCommentaires() {
        return commentaires;
    }

    public void setCommentaires(String commentaires) {
        this.commentaires = commentaires;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public String getTypeOrdinateur() {
        return typeOrdinateur;
    }

    public void setTypeOrdinateur(String typeOrdinateur) {
        this.typeOrdinateur = typeOrdinateur;
    }

    public String getFabricant() {
        return fabricant;
    }

    public void setFabricant(String fabricant) {
        this.fabricant = fabricant;
    }

    public String getModele() {
        return modele;
    }

    public void setModele(String modele) {
        this.modele = modele;
    }

    public String getNumeroSerie() {
        return numeroSerie;
    }

    public void setNumeroSerie(String numeroSerie) {
        this.numeroSerie = numeroSerie;
    }

    public String getNumeroInventaire() {
        return numeroInventaire;
    }

    public void setNumeroInventaire(String numeroInventaire) {
        this.numeroInventaire = numeroInventaire;
    }

    public String getReseau() {
        return reseau;
    }

    public void setReseau(String reseau) {
        this.reseau = reseau;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getSourceMiseAJour() {
        return sourceMiseAJour;
    }

    public void setSourceMiseAJour(String sourceMiseAJour) {
        this.sourceMiseAJour = sourceMiseAJour;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
