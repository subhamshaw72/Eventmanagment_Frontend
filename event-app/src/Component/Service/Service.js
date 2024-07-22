import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Service.css";

function Service() {
  const [services, setServices] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [Nameofevent, setNameofevent] = useState("");
  const [Dateofevent, setDateofevent] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [price, setPrice] = useState("");
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch("http://localhost:8000/Manage/getAllProducts");
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const validatePhone = (phoneNumber) => {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phoneNumber);
  };

  const Booknow = async (e) => {
    e.preventDefault();

    if (!validatePhone(phone)) {
      setPhoneError("Phone number must be exactly 10 digits.");
      return;
    }

    const new_user = {
      email,
      name,
      location,
      phone,
      Nameofevent,
      Dateofevent,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(new_user),
    };
    const response = await fetch(
      "http://localhost:8000/Bookserver/getorder",
      requestOptions
    );
    const data = await response.json();

    if (data._id != null) {
      setAlertMessage(
        "Thank you for your Booking! We will contact you soon. Book more Event"
      );
      setAlertType("success");
      window.location.href = "";
    } else {
      setAlertMessage("Something went wrong!");
      setAlertType("danger");
    }
  };

  const handleModalOpen = (title, price) => {
    setModalTitle(title);
    setNameofevent(title);
    setPrice(price);
  };

  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <>
      <div className="container mt-20">
        <div className="row Service">
          {services.map((service) => (
            <div className="col-md-4" key={service._id}>
              <div className="card mb-4">
                <img
                  src={service.image}
                  className="Serivce card-img-top img-fluid"
                  alt={service.name}
                />
                 <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title">{service.name}</h5>
                    <h6 className="text-end">₹ {service.price}</h6>
                  </div>
                  <p className="card-text">{service.desc}</p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => handleModalOpen(service.name, service.price)}
                  >
                    Get Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog custom-modal-width">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {modalTitle}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex justify-content-center align-items-center">
                <h2 className="custom-header text-center">We provide</h2>
              </div>
              <div
                id="carouselExampleControls"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <div className="card-container Modal1 me-0">
                      <div className="card modal-card2">
                        <img
                          className="img-mo1"
                          src="https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?cs=srgb&dl=pexels-andre-furtado-43594-1264210.jpg&fm=jpg"
                          alt="Delicious Food"
                        />
                        <div className="card-content modal-contant">
                          <h2 className="">Cameraman</h2>
                          <p>
                            Capture your events in stunning detail with our
                            professional cameraman services, ensuring every
                            moment is beautifully preserved. Trust us to make
                            your special occasions unforgettable with
                            high-quality visuals.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="card-container Modal1 me-0">
                      <div className="card modal-card2">
                        <img
                          className="img-mo1"
                          src="https://shaadiwish.com/blog/wp-content/uploads/2020/05/Radiant-Decorator-1.jpg"
                          alt="Delicious Food"
                        />
                        <div className="card-content modal-contant">
                          <h2>Decorators</h2>
                          <p>
                            Transform any venue into a dream setting with our
                            elegant and bespoke decor solutions tailored to your
                            event's theme. customized to enhance the ambiance of
                            your special occasion.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="card-container Modal1 me-0">
                      <div className="card modal-card2">
                        <img
                          className="img-mo1"
                          src="https://plus.unsplash.com/premium_photo-1687697860831-edaf70e279dd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt="Delicious Food"
                        />
                        <div className="card-content modal-contant">
                          <h2>Caterer</h2>
                          <p>
                            Effortlessly coordinate catering for your events
                            with our intuitive management system.
                          </p>
                        </div>
                      </div>
                      <p>$150</p>
                    </div>
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon btn btn-dark"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden text2">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon btn btn-dark"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden text-dark">Next</span>
                </button>
              </div>
              <div className="row g-3 justify-content-center">
                {/* <h3>{price}</h3> */}
              </div>
              <div>
                <div className="container my-5">
                  <div className="row justify-content-center">
                    <div className="col-lg-12">
                      <h1 className="mb-3">Book Your Event Now</h1>
                      <form>
                        <div className="row g-3">
                          <div className="col-md-12">
                            <label htmlFor="your-name" className="form-label">
                              Your Name
                            </label>
                            <input
                              onChange={(e) => setName(e.target.value)}
                              type="text"
                              className="form-control"
                              id="your-name"
                              name="your-name"
                              required
                            />
                          </div>
                          <div className="col-md-12">
                            <label
                              htmlFor="your-surname"
                              className="form-label"
                            >
                              Your Phone Number
                            </label>
                            <input
                              onChange={(e) => {
                                setPhone(e.target.value);
                                if (phoneError) {
                                  setPhoneError("");
                                }
                              }}
                              type="number"
                              className="form-control"
                              id="your-surname"
                              name="your-surname"
                              required
                            />
                            {phoneError && (
                              <div className="text-danger">{phoneError}</div>
                            )}
                          </div>
                          <div className="col-md-12">
                            <label htmlFor="your-email" className="form-label">
                              Your Email
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="your-email"
                              name="your-email"
                              value={email}
                              readOnly
                            />
                          </div>
                          <div className="col-md-12">
                            <label
                              htmlFor="your-location"
                              className="form-label"
                            >
                              Your Location
                            </label>
                            <input
                              onChange={(e) => setLocation(e.target.value)}
                              type="text"
                              className="form-control"
                              id="your-location"
                              name="your-location"
                              required
                            />
                          </div>
                          <div className="col-md-12">
                            <label
                              htmlFor="your-location"
                              className="form-label"
                            >
                              Name of Event
                            </label>
                            <input
                              onChange={(e) => setNameofevent(e.target.value)}
                              type="text"
                              className="form-control"
                              id="your-location"
                              name="your-location"
                              value={modalTitle}
                              required
                              readOnly
                            />
                          </div>
                          <div className="col-md-12">
                            <label
                              htmlFor="your-location"
                              className="form-label"
                            >
                              Date of Event
                            </label>
                            <input
                              onChange={(e) => setDateofevent(e.target.value)}
                              type="date"
                              className="form-control"
                              id="your-location"
                              name="your-location"
                              min={getTodayDate()}
                              required
                            />
                          </div>
                          <div className="col-12">
                            <button
                              onClick={Booknow}
                              className="btn btn-primary mt-3"
                              type="submit"
                            >
                              Book Event
                            </button>
                          </div>
                        </div>
                      </form>
                      {alertMessage && (
                        <div className={`alert alert-${alertType} mt-3`}>
                          {alertMessage}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Service;
