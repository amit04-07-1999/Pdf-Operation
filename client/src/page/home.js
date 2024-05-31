import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
    <>
    <div className='d-flex justify-content-center align-items-center mt-5'>

            <h1 className='display-1 fw-bold'>PDF's Operation</h1>
    </div>
        <div className='d-flex justify-content-center align-items-center'style={{marginTop:"15vh"}}>
            <div className='d-flex'>
                <Link className=" mb-3 me-5" to="/remove" style={{ width: "18rem" }}>
                    <img src="./Images/remove.jpeg" className="card-img-top" alt="Remove pages" />
                    {/* <div className="card-body">
                        <p className="card-text">
                            Select and remove the PDF pages you don’t need. Get a new file without your deleted pages.
                        </p>
                    </div> */}
                </Link>

                <Link className=" mb-3" to="/merge" style={{ width: "18rem" }}>
                    <img src="./Images/merge.jpg" className="card-img-top" alt="Merge PDFs" />
                    {/* <div className="card-body">
                        <p className="card-text">
                            Combine PDFs in the order you want with the easiest PDF merger available.
                        </p>
                    </div> */}
                </Link>
            </div>
        </div>
        </>
    );
}

export default Home;
