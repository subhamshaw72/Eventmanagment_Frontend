import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const find = async (e) => {
    e.preventDefault();
    const new_user = { email, password };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(new_user)
    };
    try {
      const response = await fetch('http://localhost:8000/userserver/Loginuser', requestOptions);
      const data = await response.json();
      if (data._id != null) {
        setAlertMessage('User logged in successfully!');
        setAlertType('success');
        localStorage.setItem('userEmail', email);
        window.location.href = "/";
        navigate('/');
      } else {
        setAlertMessage('Account not found');
        setAlertType('danger');
      }
    } catch (error) {
      setAlertMessage('An error occurred during login.');
      setAlertType('danger');
    }
  };

  const requestPasswordReset = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/userserver/requestUpdatePassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (data.message === 'OTP sent to your email') {
        setAlertMessage('OTP sent to your email');
        setAlertType('success');
        setStep(2);
      } else {
        setAlertMessage(data.message);
        setAlertType('danger');
      }
    } catch (error) {
      setAlertMessage('An error occurred while requesting password reset.');
      setAlertType('danger');
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/userserver/updatePassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword })
      });
      const data = await response.json();
      if (data.message === 'Password updated successfully') {
        setAlertMessage('Password updated successfully');
        setAlertType('success');
        setShowForgotPassword(false);
        setStep(1);
      } else {
        setAlertMessage(data.message);
        setAlertType('danger');
      }
    } catch (error) {
      setAlertMessage('An error occurred while resetting password.');
      setAlertType('danger');
    }
  };

  return (
    <>
      {alertMessage && (
        <div className={`alert alert-${alertType} alert-dismissible mt-20 fade show`} role="alert">
          <strong>{alertMessage}</strong>
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setAlertMessage('')}></button>
        </div>
      )}
      <div>
        <div id="main" className="main-container">
          <div className="box">
            <h2>Login On Eventopia</h2>
            <form onSubmit={find}>
              <div className="input-box">
                <input id="user-name" type="email" required onChange={(e) => setEmail(e.target.value)} />
                <label>Email</label>
              </div>
              <div className="input-box">
                <input id="user-pass" type="password" required onChange={(e) => setPassword(e.target.value)} />
                <label>Password</label>
              </div>
              <input id="submit" type="submit" value="Submit" />
            </form>
            <div className="container mt-5">
              <p>
                Create a new account?{' '}
                <a href="#" onClick={() => navigate('/signup')} className="btn btn-outline-primary">
                  Register
                </a>
              </p>
              <p>
                Forgot your password?{' '}
                <a href="#" onClick={() => setShowForgotPassword(true)} className="btn btn-outline-primary">
                  Reset Password
                </a>
              </p>
            </div>
          </div>
        </div>
        {showForgotPassword && (
          <div id="forgot-password">
            <div className="box  bg-danger text-white">
              <h2>Forgot Password</h2>
              {step === 1 && (
                <form onSubmit={requestPasswordReset}>
                  <div className="input-box">
                    <input type="email" required onChange={(e) => setEmail(e.target.value)} />
                    <label>Email</label>
                  </div>
                  <input id="submit" type="submit" value="Request OTP" />
                </form>
              )}
              {step === 2 && (
                <form onSubmit={resetPassword}>
                  <div className="input-box">
                    <input type="text" required onChange={(e) => setOtp(e.target.value)} />
                    <label>OTP</label>
                  </div>
                  <div className="input-box">
                    <input type="password" required onChange={(e) => setNewPassword(e.target.value)} />
                    <label>New Password</label>
                  </div>
                  <input id="submit" type="submit" value="Reset Password" />
                </form>
              )}
              <button className="btn btn-outline-secondary mt-3" onClick={() => setShowForgotPassword(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
