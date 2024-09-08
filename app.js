// const express=require('express');
const connectDB=require('./config/db');
const bodyParser=require("body-parser");
const authRoute=require("./routes/authRoutes");

const express = require('express');
const cors = require('cors')

const multer = require('multer');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const Pdf = require('./models/Pdf'); // Import the PDF model

const app = express();
app.use(cors({
  origin: 'http://localhost:3000'
}));

//Connection to the database

connectDB();

//Middleware
app.use(bodyParser.json());






// Setup multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, uuidv4() + ext);  // Unique file name
    }
});
const upload = multer({ storage });

// POST route to upload PDF with metadata
app.post('/upload', upload.single('pdf'), async (req, res) => {
    const { title, description, numberOfPages } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: 'PDF file is required' });
    }

    const pdfLink = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;

    // Create and save the PDF metadata in MongoDB
    const pdfData = new Pdf({
        title,
        description,
        numberOfPages,
        pdfLink
    });

    try {
        const savedPdf = await pdfData.save();
        res.status(201).json(savedPdf);
    } catch (err) {
        res.status(500).json({ error: 'Failed to save PDF metadata' });
    }
});

// GET route to retrieve all PDFs with metadata
app.get('/pdfs', async (req, res) => {
    try {
        const pdfs = await Pdf.find();
        res.json(pdfs);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve PDFs' });
    }
});

// Serve uploaded PDFs
app.use('/uploads', express.static('uploads'));




//Routes 
app.use("/auth",authRoute);

// Start Server

const PORT=8000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
