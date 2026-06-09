// maintain API

const express = require("express");
const router = express.Router();
const Book = require("./book.model");
const { postABook, getAllBooks, getSingleBook, updateBook, deleteABook } = require("./book.controller");
const verifyAdminToken = require("../middleware/verfiyAdminToken");

// frontend => backend server => controller => book schema => database => send data to server => frontend
// POST = when submit smth from frontend to database
// GET = when get smth back from database
// PUT/PATCH = when edit or update smth
// DELETE = when delete smth

// async => await (tell the program to wait for the database) => try-catch (catch error so the program not collapse)

// Post a book
router.post("/create-book", verifyAdminToken, postABook)

// Get all books
router.get("/", getAllBooks)

// Get single book
router.get("/:id", getSingleBook)

// Update a book endpoint
router.put("/edit/:id", verifyAdminToken, updateBook)

// Delete a book
router.delete("/:id", verifyAdminToken, deleteABook)

module.exports = router;