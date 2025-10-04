const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

// Connexion à la BDD
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté"))
  .catch((error) => console.error("Erreur de connexion MongoDB :", error));

// Import des routes
const booksRoutes = require("./routes/books");
const offersRoutes = require("./routes/offers");

// Montage des routes
app.use("/books", booksRoutes);
app.use("/offers", offersRoutes);

// Home
app.get("/", (req, res) => {
  try {
    return res.status(200).json("Bienvenue sur mon serveur Library");
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
