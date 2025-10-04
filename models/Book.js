const mongoose = require("mongoose")

// Model Book
const Book = mongoose.model("Book", {
  title: String,
  price: Number,
});

module.exports = Book;