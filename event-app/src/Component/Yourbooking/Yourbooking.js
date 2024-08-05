import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Yourbooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBooking, setEditingBooking] = useState(null);
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      const email = localStorage.getItem('userEmail');
      try {
        const response = await axios.get(`https://event-managment-admin-backend-1.onrender.com/Bookserver/getorderbyemail/${email}`);
        setBookings(response.data);
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel your event?");
    if (!confirmCancel) {
      return;
    }
    try {
      await axios.delete(`https://event-managment-admin-backend-1.onrender.com/Bookserver/deleteorder/${id}`);
      setBookings(bookings.filter(booking => booking._id !== id));
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  const handleEdit = (booking) => {
    setEditingBooking({ ...booking, Dateofevent: new Date(booking.Dateofevent).toISOString().split('T')[0] });
  };

  const handleSave = async (id) => {
    if (!validatePhone(editingBooking.phone)) {
      setPhoneError('Phone number must be exactly 10 digits.');
      return;
    }
    try {
      const response = await axios.patch(`https://event-managment-admin-backend-1.onrender.com/Bookserver/updateorder/${id}`, editingBooking);
      setBookings(bookings.map(booking => (booking._id === id ? response.data.order : booking)));
      setEditingBooking(null);
      setPhoneError('');
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const validatePhone = (phoneNumber) => {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phoneNumber);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingBooking({ ...editingBooking, [name]: value });
    if (name === 'phone' && phoneError) {
      setPhoneError('');
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-4">
      <div className="table-responsive">
        <table className="table table-dark mt-20">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Event</th>
              <th scope="col">Location</th>
              <th scope="col">Number</th>
              <th scope="col">Date of Event</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.name}</td>
                <td>{booking.email}</td>
                <td>{booking.Nameofevent}</td>
                <td>
                  {editingBooking && editingBooking._id === booking._id ? (
                    <input
                      type="text"
                      name="location"
                      value={editingBooking.location}
                      onChange={handleChange}
                    />
                  ) : (
                    booking.location
                  )}
                </td>
                <td>
                  {editingBooking && editingBooking._id === booking._id ? (
                    <>
                      <input
                        type="text"
                        name="phone"
                        value={editingBooking.phone}
                        onChange={handleChange}
                      />
                      {phoneError && <div className="text-danger">{phoneError}</div>}
                    </>
                  ) : (
                    booking.phone
                  )}
                </td>
                <td>
                  {editingBooking && editingBooking._id === booking._id ? (
                    <input
                      type="date"
                      name="Dateofevent"
                      value={editingBooking.Dateofevent}
                      min={getTodayDate()}
                      onChange={handleChange}
                    />
                  ) : (
                    new Date(booking.Dateofevent).toLocaleDateString()
                  )}
                </td>
                <td>{booking.status}</td>
                <td>
                  {booking.status !== 'accepted' && (
                    <>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm me-2"
                        onClick={() => handleEdit(booking)}
                      >
                        Edit
                      </button>
                      {editingBooking && editingBooking._id === booking._id ? (
                        <button
                          type="button"
                          className="btn btn-success btn-sm me-2"
                          onClick={() => handleSave(booking._id)}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => handleCancel(booking._id)}
                        >
                          Cancel
                        </button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Yourbooking;
