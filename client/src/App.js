// import React, { useState } from 'react';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';

// function App() {
//     const [pdf, setPdf] = useState(null);
//     const [pagesToRemove, setPagesToRemove] = useState('');
//     const [modifiedPdf, setModifiedPdf] = useState(null);

//     const [pdfs, setPdfs] = useState([]);
//     const [mergedPdf, setMergedPdf] = useState(null);

// //REMOVE PAGES IN PDF
//     const handleRemoveFileChange = (e) => {
//         setPdf(e.target.files[0]);
//     };
//     // console.log(pdf)

//     const handleRemovePages = async () => {
//         const formData = new FormData();
//         formData.append('pdf', pdf);
//         formData.append('pagesToRemove', pagesToRemove);

//         const response = await axios.post('http://localhost:8000/upload', formData, {
//             responseType: 'blob',
//         });
        
//         const url = window.URL.createObjectURL(new Blob([response.data]));
//         setModifiedPdf(url);
//     };

//     //MERGE PDFS
//     const handleMergeFileChange = (e) => {
//         setPdfs(e.target.files);
//     };

//     const handleMergePdfs = async () => {
//         const formData = new FormData();
//         for (let i = 0; i < pdfs.length; i++) {
//             formData.append('pdfs', pdfs[i]);
//         }

//         const response = await axios.post('http://localhost:8000/merge', formData, {
//             responseType: 'blob',
//         });

//         const url = window.URL.createObjectURL(new Blob([response.data]));
//         setMergedPdf(url);
//     };





//     return (
//         <>
//         <div>
//         <h1>Remove PDF Pages</h1>
//             <input type="file" onChange={handleRemoveFileChange} />
//             <input
//                 type="text"
//                 placeholder=""
//                 value={pagesToRemove}
//                 onChange={(e) => setPagesToRemove(e.target.value)}
//             />
//             <button onClick={handleRemovePages}>Remove Pages</button>
//             {modifiedPdf && (
//                 <div>
//                     <a href={modifiedPdf} download="modified.pdf">Download PDF</a>
//                 </div>
//             )}
//         </div>
//             {pdf && <embed src={window.URL.createObjectURL(pdf)} width="500px" height="500px" />}

//         <div>
//             <h1>PDF Merger</h1>
//             <input type="file" multiple onChange={handleMergeFileChange} />
//             <button onClick={handleMergePdfs}>Merge PDFs</button>
//             {mergedPdf && (
//                 <div>
//                     <h2>Merged PDF</h2>
//                     <a href={mergedPdf} download="merged.pdf">Download Merged PDF</a>
//                 </div>
//             )}
//         </div>
//         {/* {pdfs && <embed src={window.URL.createObjectURL(pdfs)} width="500px" height="500px" />} */}


//         </>
//     );
// }

// export default App; 




import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './page/home'
import Remove from './page/Remove'
import Merge from './page/Merge'

function App() {

  return (
    <Router >
      <Routes >
        <Route path='/' element={<Home />}></Route>
        <Route path='/remove' element={<Remove />}></Route>
        <Route path='/merge' element={<Merge />}></Route>
                

      </Routes>
    </Router>
  )
}

export default App
