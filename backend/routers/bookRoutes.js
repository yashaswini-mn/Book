import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// POST /books - Create a new book
router.post("/", async (request, response) => {
    try {
        // Validate incoming data
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({
                message: "Send all required fields: title, author, publishYear",
            });
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);
        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// GET /books - Get all books
router.get("/", async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books,
        });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// GET /books/:id - Get a book by its ID
router.get("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        
        // Fix: Use findById without the object notation
        const book = await Book.findById(id);
        
        if (!book) {
            return response.status(404).json({ message: "Book not found" });
        }

        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// PUT /books/:id - Update a book by its ID
router.put("/:id", async (request, response) => {
    try {
        // Validate incoming data
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({
                message: "Need to provide all the data which includes Title, Author, Publish Year",
            });
        }

        const { id } = request.params;
        const updatedBook = await Book.findByIdAndUpdate(id, request.body, {
            new: true, // Ensures we get the updated document
        });

        if (!updatedBook) {
            return response.status(404).json({ message: "Book not found" });
        }

        return response.status(200).json(updatedBook); // Send back the updated book
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// DELETE /books/:id - Delete a book by its ID
router.delete("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: "Book not found" });
        }

        return response.status(200).send({ message: "Book Deleted Successfully" });
    } catch (error) {
        console.log(error);
        return response.status(500).send({ message: error.message });
    }
});

export default router;
