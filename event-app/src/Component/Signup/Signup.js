import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const navigate = useNavigate();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) => /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(password);
  const validatePhone = (phone) => /^\d{10}$/.test(phone);
  const passwordsMatch = () => password === confirmPassword;

  const register = async () => {
    if (!validateEmail(email)) {
      setAlertMessage('Please enter a valid email address.');
      setAlertType('danger');
      return;
    }
    if (!validatePassword(password)) {
      setAlertMessage('Password must be at least 8 characters long and include at least one number and one special character.');
      setAlertType('danger');
      return;
    }
    if (!passwordsMatch()) {
      setAlertMessage('Passwords do not match.');
      setAlertType('danger');
      return;
    }
    if (!validatePhone(contact)) {
      setAlertMessage('Phone number must be exactly 10 digits.');
      setAlertType('danger');
      return;
    }

    setIsLoading(true); // Start loading

    const new_user = { email, name, password, contact, address };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(new_user),
    };

    try {
      const response = await fetch('https://event-managment-admin-backend-1.onrender.com/userserver/registeruser', requestOptions);
      const data = await response.json();

      if (response.status === 409) {
        setAlertMessage(data.message);
        setAlertType('warning');
      } else if (response.status === 201) {
        setAlertMessage('User registered successfully! Login now');
        setAlertType('success');
        localStorage.setItem('name', name);
        navigate('/login');
      } else {
        setAlertMessage('Please fill the required fields.');
        setAlertType('danger');
      }
    } catch (error) {
      setAlertMessage('An error occurred during registration.');
      setAlertType('danger');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="container mt-20">
      <div className="content">
        <h1 className="form-title">Register on Eventopia</h1>
        <form onSubmit={(e) => e.preventDefault()}>
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
          <input type="text" placeholder="NAME" onChange={(e) => setName(e.target.value)} />
          <div className="beside">
            <input type="number" placeholder="PHONE NUMBER" onChange={(e) => setContact(e.target.value)} />
          </div>
          <input type="email" placeholder="EMAIL ADDRESS" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Enter Your password" onChange={(e) => setPassword(e.target.value)} />
          <div className="password-confirmation">
            <input
              type="password"
              placeholder="Confirm Your Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={passwordsMatch() ? 'valid' : 'invalid'}
            />
            {password && confirmPassword && passwordsMatch() && (
              <span className="checkmark">&#10003;</span>
            )}
          </div>
          <input type="text" placeholder="Enter your address" onChange={(e) => setAddress(e.target.value)} />

          <button
            className="button-signup"
            type="button"
            onClick={register}
            disabled={isLoading} // Disable while loading
          >
            {isLoading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              'Submit'
            )}
          </button>
          <div className="login-link">
            <p className="text-dark">
              Already registered?{' '}
              <a href="#" onClick={() => navigate('/login')} className="btn btn-outline-primary">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
