import React, { useState, useEffect } from 'react';
import './Contact.css';
import { useNavigate } from 'react-router-dom';

function Contactus() {
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Handle form validation and submission
  const validateAndSendMessage = async () => {
    let letters = /^[a-zA-Z\s]*$/;
    let hasError = false;

    if (name.trim() === "") {
      setAlertMessage('Name is required.');
      setAlertType('danger');
      hasError = true;
    } else if (!letters.test(name)) {
      setAlertMessage('Please enter only characters for the name.');
      setAlertType('danger');
      hasError = true;
    }

    if (email.trim() === "") {
      setAlertMessage('Email is required.');
      setAlertType('danger');
      hasError = true;
    } 

    if (message.trim() === "") {
      setAlertMessage('Message is required.');
      setAlertType('danger');
      hasError = true;
    }

    if (hasError) return;

    const newUser = { email, name, message };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    };

    try {
      const response = await fetch('https://event-managment-admin-backend-1.onrender.com/Contactserver/getmessage', requestOptions);
      const data = await response.json();
      if (data._id) {
        setAlertMessage('Thank you for your message! We will contact you soon.');
        setAlertType('success');
        navigate('/');
      } else {
        setAlertMessage('Something went wrong!');
        setAlertType('danger');
      }
    } catch (error) {
      setAlertMessage('Error sending message. Please try again.');
      setAlertType('danger');
    }
  };

  useEffect(() => {
    // Any DOM manipulation or additional effects can be handled here
  }, []);

  return (
    <>
      {alertMessage && (
        <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
          <strong>{alertMessage}</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setAlertMessage('')}
          ></button>
        </div>
      )}
      <section className="contact_us bg-dark text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <div className="contact_inner">
                <div className="row">
                  <div className="col-md-10">
                    <div className="contact_form_inner">
                      <div className="contact_field">
                        <h3>Contact Us</h3>
                        <p>Feel free to contact us anytime. We will get back to you as soon as we can!</p>
                        <input
                          type="text"
                          className="form-control form-group"
                          placeholder="Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <input
                          type="text"
                          className="form-control form-group"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <textarea
                          className="form-control form-group"
                          placeholder="Message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                        <button className="contact_form_submit" onClick={validateAndSendMessage}>Send</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="right_conatct_social_icon d-flex align-items-end">
                      <div className="socil_item_inner d-flex">
                        <li><a href="#"><i className="fab fa-facebook-square" /></a></li>
                        <li><a href="#"><i className="fab fa-instagram" /></a></li>
                        <li><a href="#"><i className="fab fa-twitter" /></a></li>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="contact_info_sec">
                  <h4>Contact Info</h4>
                  <div className="d-flex info_single align-items-center">
                    <i className="fas fa-headset" />
                    <span>+91 8009 054294</span>
                  </div>
                  <div className="d-flex info_single align-items-center">
                    <i className="fas fa-envelope-open-text" />
                    <span>eventopia202466@gmail.com</span>
                  </div>
                  <div className="d-flex info_single align-items-center">
                    <i className="fas fa-map-marked-alt" />
                    <span>1000+ Event partners and 65+ Service cities across India</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="map_sec">
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <div className="map_inner">
                <h4>Find Us on Google Map</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quo beatae quasi assumenda, expedita aliquam minima tenetur maiores neque incidunt repellat aut voluptas hic dolorem sequi ab porro, quia error.</p>
                <div className="map_bind">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d471220.5631094339!2d88.04952462217592!3d22.6757520733225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1596988408134!5m2!1sen!2sin"
                    width="100%"
                    height={450}
                    frameBorder={0}
                    style={{ border: 0 }}
                    allowFullScreen
                    aria-hidden="false"
                    tabIndex={0}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contactus;
