import React, { useEffect, useState } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setIsAuthenticated(true);
      setUserEmail(email);
    }
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    setUserEmail("");
    navigate("/login");
  };

  const collapseNavbar = () => {
    const navbarCollapse = document.getElementById('navbarCollapse');
    if (navbarCollapse) {
      const bsCollapse = new window.bootstrap.Collapse(navbarCollapse, {
        toggle: false,
      });
      bsCollapse.hide();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top px-0 py-0 mb-0">
      <div className="container-xl">
        <Link className="navbar-brand" to="/">
          <img
            src="eve.png"
            className="img-fluid custom-logo"
            alt="Logo"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav mx-lg-auto">
            <Link className="nav-item nav-link" to="/" aria-current="page" onClick={collapseNavbar}>
              HOME
            </Link>
            <Link className="nav-item nav-link" to="About" onClick={collapseNavbar}>
              ABOUT
            </Link>
            <Link className="nav-item nav-link" to="Service" onClick={collapseNavbar}>
              SERVICE
            </Link>
            <Link className="nav-item nav-link" to="Contact" onClick={collapseNavbar}>
              CONTACT
            </Link>
          </div>
          {!isAuthenticated ? (
            <>
              <div className="navbar-nav ms-lg-4">
                <Link className="nav-item nav-link" to="/login" onClick={collapseNavbar}>
                  LOGIN
                </Link>
              </div>
              <div className="d-flex align-items-lg-center mt-3 mt-lg-0">
                <Link to="/signup" className="btn btn-sm btn-primary w-full w-lg-auto" onClick={collapseNavbar}>
                  Register
                </Link>
              </div>
            </>
          ) : (
            <div className="navbar-nav ms-lg-4">
              <div className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle user-icon"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={faUser} />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <Link className="dropdown-item" to="Yourbooking" onClick={collapseNavbar}>
                      Your Bookings
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="Yourprofile" onClick={collapseNavbar}>
                      Your Profile
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        handleLogout();
                        collapseNavbar();
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
