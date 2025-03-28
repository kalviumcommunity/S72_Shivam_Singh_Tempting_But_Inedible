import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Base URL for the backend API
const BASE_URL = 'https://s72-shivam-singh-tempting-but-inedible.onrender.com';

const AuthPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
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
      const response = await fetch(`${BASE_URL}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      // Redirect to login page after successful signup
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <StyledWrapper>
      <div className="card">
        <a className="singup">Sign Up</a>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="inputBox1">
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
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required 
            />
            <span>Username</span>
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
          <button type="submit" className="enter">Sign Up</button>
        </form>
        <div className="login-section">
          <p className="login-text">Already have an account?</p>
          <button onClick={handleLoginClick} className="login-button">Login</button>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
background-color: transparent;
padding-top: 160px;

  .login-section {
    margin-top: 15px;
    text-align: center;
    width: 100%;
  }

  .login-text {
    color: #000;
    font-size: 0.8rem;
    margin-bottom: 8px;
  }

  .login-button {
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

  .login-button:hover {
    background-color: #000;
    color: #fff;
  }

  .singup {
    color: #000;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: bold;
    font-size: 1.2rem;
    margin-top: 0.5em;
  }

  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 250px;
    min-height: 300px;
    background: #e3e3e3;
    border-radius: 8px;
    padding: 15px;
  }

  .inputBox,
  .inputBox1 {
    position: relative;
    width: 180px;
    margin-bottom: 20px;
  }

  .inputBox input,
  .inputBox1 input {
    width: 100%;
    padding: 6px;
    outline: none;
    border: none;
    color: #000;
    font-size: 0.8rem;
    background: transparent;
    border-left: 2px solid #000;
    border-bottom: 2px solid #000;
    transition: 0.1s;
    border-bottom-left-radius: 6px;
  }

  .inputBox span,
  .inputBox1 span {
    position: absolute;
    left: 0;
    transform: translateY(-4px);
    margin-left: 6px;
    padding: 6px;
    pointer-events: none;
    font-size: 0.7rem;
    color: #000;
    text-transform: uppercase;
    transition: 0.5s;
    letter-spacing: 1px;
    border-radius: 6px;
  }

  .inputBox input:valid ~ span,
  .inputBox input:focus ~ span {
    transform: translateX(70px) translateY(-12px);
    font-size: 0.6rem;
    padding: 3px 6px;
    background: #000;
    color: #fff;
  }

  .inputBox1 input:valid ~ span,
  .inputBox1 input:focus ~ span {
    transform: translateX(85px) translateY(-12px);
    font-size: 0.6rem;
    padding: 3px 6px;
    background: #000;
    color: #fff;
  }

  .inputBox input:valid,
  .inputBox input:focus,
  .inputBox1 input:valid,
  .inputBox1 input:focus {
    border: 2px solid #000;
    border-radius: 6px;
  }

  .enter {
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

  .enter:hover {
    background-color: #000;
    color: #fff;
  } 
`;

export default AuthPage;
