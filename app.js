// const express=require('express');
const connectDB = require('./config/db');
const bodyParser = require("body-parser");
const authRoute = require("./routes/authRoutes");
const personRoute = require("./routes/personRoutes")
const ticketRoute = require("./routes/ticketRoutes")

const express = require('express');
const cors = require('cors')

const multer = require('multer');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');  // Import pdf-parse
const Pdf = require('./models/Pdf'); // Import the PDF model
const authMiddleware = require('./middleware/authMiddleware');
const cancellationRoutes = require('./routes/cancellationRoutes');
// <<<<<<< HEAD
const contactUsRoutes = require('./routes/contactUsRoute');
const windowIosRoutes = require('./routes/windowsIosRoutes');
const getLinkRoutes = require('./routes/getLinksRoute');
// =======
// >>>>>>> parent of 38f1b1c (add contact us and get linkes api)
const app = express();
app.use(cors({
    origin: '*'
}));

//Connection to the database

connectDB();

//Middleware
app.use(bodyParser.json());

// Middleware Functions to log 
const logger = (req, res, next) => {
    ``
    console.log(`Method: ${req.method} ${req.url}  Date ${new Date().toLocaleDateString()} Body:${JSON.stringify(req.body)}  frfre`);
    next();
}
app.use(logger);


// Simple root route
app.get('/', (req, res) => {
    res.send('API is running...');
});
//Routes
app.use("/auth", authRoute);

app.use("/person", personRoute);
app.use("/ticket", ticketRoute);
app.use('/cancellation', cancellationRoutes);

app.use('/contact-us', contactUsRoutes);
app.use('/windowIos', windowIosRoutes);
app.use("/getAllLinks", getLinkRoutes)






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
// app.post('/upload', upload.single('pdf'), async (req, res) => {
//     const { title, description, numberOfPages } = req.body;
//     const file = req.file;

//     if (!file) {
//         return res.status(400).json({ error: 'PDF file is required' });
//     }

//     const pdfLink = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;

//     // Create and save the PDF metadata in MongoDB
//     const pdfData = new Pdf({
//         title,
//         description,
//         numberOfPages,
//         pdfLink
//     });

//     try {
//         const savedPdf = await pdfData.save();
//         res.status(201).json(savedPdf);
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to save PDF metadata' });
//     }
// });

// POST route to upload PDF with automatic page count extraction
app.post('/upload', upload.single('pdf'), async (req, res) => {
    const { title, description } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: 'PDF file is required' });
    }

    const pdfPath = `uploads/${file.filename}`;
    const pdfLink = `${req.protocol}s://${req.get('host')}/uploads/${file.filename}`;

    // Extract number of pages from the uploaded PDF
    try {
        const pdfBuffer = fs.readFileSync(pdfPath);  // Read the PDF file
        const data = await pdfParse(pdfBuffer);  // Parse the PDF to extract metadata

        const numberOfPages = data.numpages;  // Get the number of pages

        // Create and save the PDF metadata in MongoDB
        const pdfData = new Pdf({
            title,
            description,
            numberOfPages,
            pdfLink
        });

        const savedPdf = await pdfData.save();
        res.status(201).json(savedPdf);

    } catch (err) {
        res.status(500).json({ error: 'Failed to process PDF' });
    }
});

// GET route to retrieve all PDFs with metadata
app.get('/pdfs', async (req, res) => {
    try {
        const pdfs = await Pdf.find();
        res.json(pdfs);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve PDFs ' });
    }
});

// Serve uploaded PDF's
app.use('/uploads', express.static('uploads'));






// Start Server

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



