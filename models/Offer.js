const mongoose = require("mongoose");

// Modèle Offer
const Offer = mongoose.model("Offer", {
  type: String,       // "percentage" | "minus" | "slice"
  value: Number,      // montant ou pourcentage de la réduction
  sliceValue: Number, // seuil pour les offres "slice"
});

module.exports = Offer;
