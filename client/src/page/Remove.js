import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './style.css';
import { Link } from 'react-router-dom';

function App() {
    const [pdf, setPdf] = useState(null);
    const [pagesToRemove, setPagesToRemove] = useState('');
    const [modifiedPdf, setModifiedPdf] = useState(null);

    const handleRemoveFileChange = (e) => {
        setPdf(e.target.files[0]);
    };

    const handleRemovePages = async (e) => {
        e.preventDefault();  // Prevent form from submitting in the default way
        const formData = new FormData();
        formData.append('pdf', pdf);
        formData.append('pagesToRemove', pagesToRemove);

        try {
            const response = await axios.post('http://localhost:8000/upload', formData, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            setModifiedPdf(url);
        } catch (error) {
            console.error('Error removing pages from PDF:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h1 className="display-5 fw-bold text-center">Remove PDF Pages</h1>
                    <form onSubmit={handleRemovePages}>
                        <div className="mb-3">
                            <label htmlFor="pdfFile" className="form-label">Upload PDF</label>
                            <input
                                type="file"
                                id="pdfFile"
                                className="form-control"
                                onChange={handleRemoveFileChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pagesToRemove" className="form-label">Pages to Remove (comma-separated)</label>
                            <input
                                type="text"
                                id="pagesToRemove"
                                className="form-control"
                                value={pagesToRemove}
                                onChange={(e) => setPagesToRemove(e.target.value)}
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary">Remove Pages</button>
                        </div>
                        <Link to="/">Go to Home</Link>
                    </form>
                    {modifiedPdf && (
                        <div className="mt-3">
                            <a href={modifiedPdf} download="modified.pdf" className="btn btn-success">Download Modified PDF</a>
                        </div>
                    )}
                    {pdf && (
                        <div className="mt-3">
                            <embed src={window.URL.createObjectURL(pdf)} width="100%" height="500px" />
                        </div>
                    )}
                </div>
            
            </div>
        </div>
    );
}

export default App;
