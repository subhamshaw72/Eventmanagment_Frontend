import React, { useEffect, useState } from "react";
import axios from "axios";
import "./About.css";

function About() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    axios.get("https://event-managment-admin-backend-1.onrender.com/Aboutserver/getAllabout")
      .then(response => {
        setTestimonials(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the testimonials!", error);
      });
  }, []);

  return (
    <div className="container mt-0">
      <div className="testimonial-container">
        <div className="col-md-12 mt-20 text-center">
          <h1 className="about_taital text-warning">Testimonials</h1>
          <div className="bulit_icon"></div>
        </div>

        {testimonials.map((testimonial, index) => (
          <React.Fragment key={index}>
            <hr className="featurette-divider" />
            <div className="row featurette">
              <div className={`col-md-7 ${index % 2 === 1 ? 'order-md-2' : ''}`}>
                <h2 className="featurette-heading fw-normal text-white lh-1">
                  {testimonial.name}
                  <span className="text-body-secondary"></span>
                </h2>
                <p className="lead mt-3">
                  {testimonial.desc}
                </p>
              </div>
              <div className={`col-md-5 ${index % 2 === 1 ? 'order-md-1' : ''}`}>
                <img
                  src={testimonial.image}
                  className="img-fluid"
                  style={{
                    maxWidth: "100%",
                    height: "100%",
                    border: "5px solid #39FF14",
                    borderRadius: "10px",
                  }}
                  alt={testimonial.name}
                />
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default About;
