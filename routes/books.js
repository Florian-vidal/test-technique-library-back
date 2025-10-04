const express = require("express");
const router = express.Router();

// Import du modèle Book (défini dans /models/Book.js)
// Ce modèle correspond à la collection "books" dans MongoDB
const Book = require("../models/Book");

// Route GET /books
// Objectif : récupérer la liste de tous les livres en base de données
router.get("/", async (req, res) => {
  try {
    // On récupère tous les documents de la collection books
    const books = await Book.find();

    // On renvoie le tableau des livres au client avec un statut 200 OK
    return res.status(200).json(books);
  } catch (error) {
    // En cas d’erreur serveur, on renvoie une réponse 500 avec le message d’erreur
    return res.status(500).json(error.message);
  }
});

// Route GET /books/:id
// Objectif : récupérer un livre spécifique à partir de son ID MongoDB
router.get("/:id", async (req, res) => {
  try {
    // On tente de trouver un livre dont l’_id correspond à celui dans l’URL
    const book = await Book.findById(req.params.id);

    // Si aucun livre trouvé => erreur 404 Not Found
    if (!book) {
      return res.status(404).json({ message: "Livre non trouvé dans la BDD" });
    }

    // Sinon, on renvoie le livre trouvé
    return res.status(200).json(book);
  } catch (error) {
    // Si l’ID est mal formé ou autre erreur serveur
    return res.status(500).json(error.message);
  }
});

// Route POST /books
// Objectif : ajouter un nouveau livre dans la base
router.post("/", async (req, res) => {
  try {
    // On crée une nouvelle instance du modèle Book
    // à partir des données envoyées dans le body de la requête
    const newBook = new Book({
      title: req.body.title,
      price: req.body.price,
    });

    // On sauvegarde le livre dans MongoDB
    await newBook.save();

    // On renvoie une réponse 201 Created avec un message + le livre créé
    return res
      .status(201)
      .json({ message: `Livre ${newBook.title} créé !`, book: newBook });
  } catch (error) {
    // Gestion d’erreur serveur
    return res.status(500).json(error.message);
  }
});

// Route PUT /books/:id
// Objectif : modifier un livre existant en base
router.put("/:id", async (req, res) => {
  try {
    // On recherche le livre à modifier
    const book = await Book.findById(req.params.id);

    // Si aucun livre trouvé
    if (!book) {
      return res.status(404).json({ message: "Livre non trouvé dans la BDD" });
    }

    // Mise à jour des propriétés avec les nouvelles valeurs reçues
    book.title = req.body.title;
    book.price = req.body.price;

    // On sauvegarde les modifications dans la base
    const updatedBook = await book.save();

    // On renvoie le livre mis à jour
    return res
      .status(200)
      .json({ message: "Livre mis à jour avec succès", book: updatedBook });
  } catch (error) {
    console.error("Erreur dans PUT /books/:id :", error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Route DELETE /books/:id
// Objectif : supprimer un livre de la base de données
router.delete("/:id", async (req, res) => {
  try {
    // On cherche et supprime directement le livre via son ID
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    // Si aucun livre trouvé, on renvoie une erreur 404
    if (!deletedBook) {
      return res.status(404).json({ message: "Livre non trouvé dans la BDD" });
    }

    // Sinon, on confirme la suppression avec un message
    return res
      .status(200)
      .json({ message: `Livre "${deletedBook.title}" supprimé !` });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

module.exports = router;
