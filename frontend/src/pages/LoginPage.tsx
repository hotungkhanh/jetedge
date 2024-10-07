import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthHeader, useAuthContext } from '../security/AuthContext';
import '../styles/login.css';
import VIT_Logo from '../assets/logo.png';
import { LOCAL_API_URL } from '../scripts/api';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { setAuthHeader } = useAuthContext();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const encodedHeader: AuthHeader = `Basic ${btoa(`${username}:${password}`)}`;

    try {
      // Send a request to the backend to validate credentials
      const response = await fetch(LOCAL_API_URL + "/login", {
        method: 'GET', // or POST depending on your API design
        headers: {
          'Authorization': encodedHeader,
        },
      });

      if (response.status != 401) {
        setAuthHeader(encodedHeader);
        navigate("/enrolment");
      }
      else {
        alert("Unauthorised");
      }
    }
    catch (error) {
      console.log(error);
    }

  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        {/* Logo at the top */}
        <img src={VIT_Logo} alt="Logo" className="login-logo" />

        <h2 className="login-title">Login</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            required
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
        </div>

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};