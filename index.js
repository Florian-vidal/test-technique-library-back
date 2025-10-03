const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI);

app.use(express.json());
app.use(cors());

// Model Book
const Book = mongoose.model("Book", {
  title: String,
  price: Number,
});

// Model Offer
const Offer = mongoose.model("Offer", {
  type: String,
  value: Number,
});

// Route Test
app.get("/", (req, res) => {
  try {
    return res.status(200).json("Bienvenue sur mon serveur Library");
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// Liste de tous les livres
app.get("/books", async (req, res) => {
  try {
    // console.log("Voici tous les livres");

    const books = await Book.find();

    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// Créer un livre
app.post("/book", async (req, res) => {
  try {
    const newBook = new Book({
      title: req.body.title,
      price: req.body.price,
    });
    console.log("Livre créé");

    await newBook.save();

    return res
      .status(201)
      .json({ message: `Livre ${newBook.title} créé !`, book: newBook });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// Récupérer les offres commerciales
app.get("/offers", async (req, res) => {
  try {
    const offers = await Offer.find();
    return res.status(200).json(offers);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// Créer une offre commerciale
app.post("/offer", async (req, res) => {
  try {
    const newOffer = new Offer({
      type: req.body.type,
      value: req.body.value,
    });
    // console.log("L'offre a été créé !");

    await newOffer.save();
    return res.status(201).json({ newOffer });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// Route Catch all
app.get(/.*/, (req, res) => {
  return res.status(404).json("Not found");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
