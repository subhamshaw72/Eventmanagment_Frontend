import React from "react";
// import { svg } from 'react-svg';
// import MysvgImage from './restaurant.svg';

import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
function Home() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setIsAuthenticated(true);
    }
  }, []);

  const navigate = useNavigate();
 
  return (
    <>
      <div id="carouselExampleCaptions" className="carousel slide mt-20 ">
        <div className="carousel-indicators"  data-bs-ride="carousel" data-bs-interval="500">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={0}
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={1}
            aria-label="Slide 2"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={2}
            aria-label="Slide 3"
          />
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="1st.jpg" className="d-block w-100 half-size" alt="..." />
            <div className="carousel-caption ">
              <div class="container">
                <div class="carousel-caption text-start">
                
                  <p class="bg-light p-6 rounded shadow-sm opacity-75 para fs-5 fw-bold">
                  <h1>Welcome to Eventopia</h1>
                    Discover seamless event planning with our expert team. From
                    weddings to corporate events, we bring your vision to life.
                    {!isAuthenticated && (
                      <button className="btn btn-lg btn-primary ms-0" onClick={() => navigate('/login')}>
                        LOGIN
                      </button>
                    )}
                  </p>
                 
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img src="2nd.avif" className="d-block w-100 half-size" alt="..." />
            <div className="carousel-caption ">
              <div class="carousel-caption">
              <p class="bg-light p-6 rounded shadow-sm opacity-75 para fs-5 fw-bold">
                <h1>Book Your Event now</h1>
                <p>
                Experience the perfect blend of elegance and excitement by booking your event with us today.
                </p>
                <p>
                <button class="btn btn-lg btn-primary ms-0 " onClick = {()=>navigate('/service')} >
                      Learn more
                    </button>
                </p>
                </p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img src="3rd.avif" className="d-block w-100 half-size" alt="..." />

            <div className="carousel-caption ">
              <div class="carousel-caption text-end">
              <p class="bg-light p-6 rounded shadow-sm opacity-75 para fs-5 fw-bold">
                {
                  !isAuthenticated && (
                <h1>Register on Eventopia</h1>
                
          )}
          
                <p>
                Join Eventopia today and unlock endless possibilities for unforgettable events!
                </p>
                <p>
                  {!isAuthenticated && (
                    <button className="btn btn-lg btn-primary ms-0" onClick={() => navigate('/signup')}>
                      Register Now
                    </button>
                  )}
                </p>
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
     

     
      <div>
      <h1 className="text-center text-info mt-10 ">Our Teams</h1>
        <div className="box-area">
          
        
          <div className="single-box">
            <div className="img-area" />
            <div className="img-text">
              <span className="header-text">
                <strong>Subham Shaw</strong>
              </span>
              <div className="line" />
              <h3>Event Manager</h3>
              <p>
              An event manager orchestrates seamless and memorable events, handling everything from planning and coordination to execution with precision and creativity.
              </p>
            </div>
          </div>
          <div className="single-box">
            <div className="img-area" />
            <div className="img-text">
              <span className="header-text">
                <strong>Debangshi Das</strong>
              </span>
              <div className="line" />
              <h3>Event Organiser</h3>
              <p>
              An event organizer meticulously plans and executes memorable events, ensuring every detail aligns perfectly to create seamless and unforgettable experiences.
              </p>
            </div>
          </div>
         
          
        </div>
      </div>
    </>
  );
}

export default Home;
