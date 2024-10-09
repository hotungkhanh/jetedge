import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthHeader, useAuthContext } from '../security/AuthContext';
import '../styles/login.css';
import VIT_Logo from '../assets/logo.png';
import { REMOTE_API_URL } from '../scripts/api';
import LoadingButton from '../components/LoadingButton';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { setAuthHeader } = useAuthContext();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const encodedHeader: AuthHeader = `Basic ${btoa(`${username}:${password}`)}`;

    try {
      // Send a request to the backend to validate credentials
      const response = await fetch(REMOTE_API_URL + "/login", {
        method: 'GET',
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
      alert(error);
    }
    finally {
      setLoading(false);
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

        <LoadingButton
          loading={loading}
          onClick={() => {}}
          text="Login"
          type='submit'
          sx={{
            width: '100%',
            height: '40px',
            marginTop: '2px',
          }}
        />
      </form>
    </div>
  );
};