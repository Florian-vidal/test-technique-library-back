const express = require("express");
const router = express.Router();

// Import du modèle Offer (défini dans /models/Offer.js)
// Ce modèle correspond à la collection offers dans MongoDB
const Offer = require("../models/Offer");

// Route GET /offers
// Objectif : récupérer toutes les offres commerciales disponibles
router.get("/", async (req, res) => {
  try {
    // On récupère toutes les offres dans la collection "offers"
    const offers = await Offer.find();

    // On renvoie la liste des offres en JSON avec un statut 200 OK
    return res.status(200).json(offers);
  } catch (error) {
    // Si une erreur survient (ex: problème de connexion à MongoDB)
    return res.status(500).json(error.message);
  }
});

// Route POST /offers
// Objectif : créer et enregistrer une nouvelle offre commerciale
router.post("/", async (req, res) => {
  try {
    // On crée une nouvelle instance du modèle Offer
    // Les données viennent du corps de la requête (req.body)
    const newOffer = new Offer({
      type: req.body.type, // exemple : "percentage", "minus" ou "slice"
      value: req.body.value, // montant de la réduction (en % ou en €)
      sliceValue: req.body.sliceValue || null, // seuil pour les offres "slice"
    });

    // On sauvegarde cette nouvelle offre dans la base MongoDB
    await newOffer.save();

    // On renvoie une réponse 201 Created avec l’offre créée
    return res.status(201).json({
      message: "Offre commerciale créée avec succès",
      offer: newOffer,
    });
  } catch (error) {
    // En cas d’erreur serveur, on renvoie un statut 500 avec le message d’erreur
    return res.status(500).json(error.message);
  }
});

module.exports = router;
