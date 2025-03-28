import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Base URL for the backend API
const BASE_URL = 'https://s72-shivam-singh-tempting-but-inedible.onrender.com';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Updated API endpoint to use Render backend
      const response = await fetch(`${BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/collection');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <StyledWrapper>
      <div className="card">
        <a className="login">Log in</a>
        {error && <p className="error" style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="inputBox">
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required 
            />
            <span className="user">Email</span>
          </div>
          <div className="inputBox">
            <input 
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required 
            />
            <span>Password</span>
          </div>
          <button type="submit" className="enter">Enter</button>
        </form>
        <div className="signup-section">
          <p className="signup-text">Don't have an account?</p>
          <button onClick={handleSignupClick} className="signup-button">Sign Up</button>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: transparent;
  margin: 0;
  padding: 0;

  .login {
    color: #000;
    text-transform: uppercase;
    letter-spacing: 2px;
    display: block;
    font-weight: bold;
    font-size: large;
    margin-top: 20px;
  }

  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
    width: 250px;
    min-height: 300px;
    background: #e3e3e3;
    border-radius: 8px;
    padding: 15px;
  }

  .inputBox {
    position: relative;
    width: 220px;
  }

  .inputBox input {
    width: 100%;
    padding: 8px;
    outline: none;
    border: none;
    color: #000;
    font-size: 0.9em;
    background: transparent;
    border-left: 2px solid #000;
    border-bottom: 2px solid #000;
    transition: 0.1s;
    border-bottom-left-radius: 8px;
    margin-bottom: 15px;
  }

  .inputBox span {
    margin-top: 5px;
    position: absolute;
    left: 0;
    transform: translateY(-4px);
    margin-left: 10px;
    padding: 8px;
    pointer-events: none;
    font-size: 11px;
    color: #000;
    text-transform: uppercase;
    transition: 0.5s;
    letter-spacing: 3px;
    border-radius: 8px;
  }

  .inputBox input:valid ~ span,
  .inputBox input:focus ~ span {
    transform: translateX(93px) translateY(-15px);
    font-size: 0.7em;
    padding: 5px 10px;
    background: #000;
    letter-spacing: 0.2em;
    color: #fff;
  }

  .inputBox input:valid,
  .inputBox input:focus {
    border: 2px solid #000;
    border-radius: 8px;
  }

  .enter {
    height: 40px;
    width: 90px;
    border-radius: 5px;
    border: 2px solid #000;
    cursor: pointer;
    background-color: transparent;
    transition: 0.5s;
    text-transform: uppercase;
    font-size: 0.8em;
    letter-spacing: 2px;
    margin-bottom: 0.5em;
  }

  .enter:hover {
    background-color: rgb(0, 0, 0);
    color: white;
  }

  .signup-section {
    margin-top: 15px;
    text-align: center;
    width: 100%;
  }

  .signup-text {
    color: #000;
    font-size: 0.8rem;
    margin-bottom: 8px;
  }

  .signup-button {
    height: 30px;
    width: 70px;
    border-radius: 4px;
    border: 2px solid #000;
    cursor: pointer;
    background-color: transparent;
    transition: 0.5s;
    text-transform: uppercase;
    font-size: 0.7rem;
    letter-spacing: 1px;
    margin: 0;
  }

  .signup-button:hover {
    background-color: #000;
    color: #fff;
  }

  .error {
    color: red;
    font-size: 0.8rem;
    text-align: center;
    margin-top: -10px;
  }
`;

export default Login;
