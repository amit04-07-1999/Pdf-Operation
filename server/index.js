const express = require('express');
const multer = require('multer');
const { PDFDocument } = require('pdf-lib');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
// const dotenv = require ('dotenv')

const app = express();
// dotenv.config()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({ dest: 'uploads/' });

//Remove Page
app.post('/upload', upload.single('pdf'), async (req, res) => {
    const pdfPath = req.file.path;
    const pagesToRemove = req.body.pagesToRemove.split(',').map(Number);

    const pdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);

    const totalPages = pdfDoc.getPageCount();
    const newPdfDoc = await PDFDocument.create();

    for (let i = 0; i < totalPages; i++) {
        if (!pagesToRemove.includes(i + 1)) {
            const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [i]);
            newPdfDoc.addPage(copiedPage);
        }
    }

    const newPdfBytes = await newPdfDoc.save();
    const newPdfPath = `uploads/modified_${req.file.filename}.pdf`;
    fs.writeFileSync(newPdfPath, newPdfBytes);

    res.download(newPdfPath, 'modified.pdf', () => {
        fs.unlinkSync(pdfPath);
        fs.unlinkSync(newPdfPath);
    });
});

//Merge Page
app.post('/merge', upload.array('pdfs', 10), async (req, res) => {
    const pdfPaths = req.files.map(file => file.path);
    const mergedPdf = await PDFDocument.create();

    for (const pdfPath of pdfPaths) {
        const pdfBytes = fs.readFileSync(pdfPath);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
        copiedPages.forEach((page) => {
            mergedPdf.addPage(page);
        });
    }

    const mergedPdfBytes = await mergedPdf.save();
    const mergedPdfPath = `uploads/merged_${Date.now()}.pdf`;
    fs.writeFileSync(mergedPdfPath, mergedPdfBytes);

    res.download(mergedPdfPath, 'merged.pdf', () => {
        pdfPaths.forEach((path) => fs.unlinkSync(path));
        fs.unlinkSync(mergedPdfPath);
    });
});


const PORT = 8000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
