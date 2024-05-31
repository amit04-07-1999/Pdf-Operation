import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';


function App() {
    const [pdfs, setPdfs] = useState([]);
    const [mergedPdf, setMergedPdf] = useState(null);

    const handleMergeFileChange = (e) => {
        setPdfs(e.target.files);
    };

    const handleMergePdfs = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let i = 0; i < pdfs.length; i++) {
            formData.append('pdfs', pdfs[i]);
        }

        try {
            const response = await axios.post('http://localhost:8000/merge', formData, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            setMergedPdf(url);
        } catch (error) {
            console.error('Error merging PDFs:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h1 className="display-5 fw-bold text-center">PDF Merger</h1>
                    <form onSubmit={handleMergePdfs}>
                        <div className="mb-3">
                            <label htmlFor="pdfFiles" className="form-label">Upload PDFs</label>
                            <input
                                type="file"
                                id="pdfFiles"
                                className="form-control"
                                multiple
                                onChange={handleMergeFileChange}
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary">Merge PDFs</button>
                        </div>
                        <Link to="/">Go to Home</Link>
                    </form>
                    {mergedPdf && (
                        <div className="mt-3">
                            <h2>Merged PDF</h2>
                            <a href={mergedPdf} download="merged.pdf" className="btn btn-success">Download Merged PDF</a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
