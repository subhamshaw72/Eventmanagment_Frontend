import React from "react";
import "./Yourprofile.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Yourprofile() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      const email = localStorage.getItem("userEmail");
      try {
        const response = await axios.get(
          `https://event-managment-admin-backend-1.onrender.com/userserver/getuserbyemail/${email}`
        );
        setUsers(response.data);
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = async () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (!confirmCancel) {
      return;
    }
    try {
      await axios.delete(
        `https://event-managment-admin-backend-1.onrender.com/userserver/deleteuser/${users._id}`
      );
      localStorage.removeItem('userEmail');
     window.location.href="/";
      setUsers({});
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="main mt-20">
      <div className="card">
        <div className="card-body">
          <i className="fa fa-pen fa-xs edit" />
          <h2>Your Profile</h2>
          {users && (
            <table>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>:</td>
                  <td>{users.name}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>:</td>
                  <td>{users.email}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>:</td>
                  <td>{users.address}</td>
                </tr>
                <tr>
                  <td>Contact</td>
                  <td>:</td>
                  <td>{users.contact}</td>
                </tr>
              </tbody>
            </table>
          )}
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleDelete}
          >
            Delete your Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Yourprofile;
