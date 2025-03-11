import React from 'react';
import styled from 'styled-components';

const Login = () => {
  return (
    <StyledWrapper>
      <div className="card">
        <a className="login">Log in</a>
        <div className="inputBox">
          <input type="text" required="required" />
          <span className="user">Username</span>
        </div>
        <div className="inputBox">
          <input type="password" required="required" />
          <span>Password</span>
        </div>
        <button className="enter">Enter</button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* Center the card on the page */
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
    font-size: large; /* Reduced from x-large */
    margin-top: 20px;
  }

  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px; /* Reduced from 35px */
    width: 250px; /* Reduced from 300px */
    min-height: 300px; /* Reduced from 350px */
    background: #e3e3e3;
    border-radius: 8px;
    padding: 15px; /* Added padding for better spacing */
  }

  .inputBox {
    position: relative;
    width: 220px; /* Reduced from 250px */
  }

  .inputBox input {
    width: 100%;
    padding: 8px; /* Reduced from 10px */
    outline: none;
    border: none;
    color: #000;
    font-size: 0.9em; /* Reduced from 1em */
    background: transparent;
    border-left: 2px solid #000;
    border-bottom: 2px solid #000;
    transition: 0.1s;
    border-bottom-left-radius: 8px;
  }

  .inputBox span {
    margin-top: 5px;
    position: absolute;
    left: 0;
    transform: translateY(-4px);
    margin-left: 10px;
    padding: 8px; /* Reduced from 10px */
    pointer-events: none;
    font-size: 11px; /* Reduced from 12px */
    color: #000;
    text-transform: uppercase;
    transition: 0.5s;
    letter-spacing: 3px;
    border-radius: 8px;
  }

  .inputBox input:valid ~ span,
  .inputBox input:focus ~ span {
    transform: translateX(93px) translateY(-15px); /* Adjusted for smaller size */
    font-size: 0.7em; /* Reduced from 0.8em */
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
    height: 40px; /* Reduced from 45px */
    width: 90px; /* Reduced from 100px */
    border-radius: 5px;
    border: 2px solid #000;
    cursor: pointer;
    background-color: transparent;
    transition: 0.5s;
    text-transform: uppercase;
    font-size: 0.8em; /* Adjusted from 10px */
    letter-spacing: 2px;
    margin-bottom: 0.5em; /* Reduced margin */
  }

  .enter:hover {
    background-color: rgb(0, 0, 0);
    color: white;
  }
`;

export default Login;