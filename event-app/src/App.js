import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./Component/Navbar/Navbar";
import Home from "./Component/Home/Home";
import About from "./Component/About/About";
import Contactus from "./Component/Contact/Contactus";
import Service from "./Component/Service/Service";
import Login from "./Component/Login/Login";
import Signup from "./Component/Signup/Signup";
import Footer from "./Component/Footer/Footer";
import ProtectedRoute from "./Component/ProtectedRoute/protect";
import Yourprofile from "./Component/yourprofile/Yourprofile";
import Yourbooking from "./Component/Yourbooking/Yourbooking";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contactus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/service"
          element={
            <ProtectedRoute>
              <Service />
            </ProtectedRoute>
          }
        />
        <Route path="/yourprofile" element={<Yourprofile></Yourprofile>} />
        <Route path="/yourbooking" element={<Yourbooking></Yourbooking>} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
