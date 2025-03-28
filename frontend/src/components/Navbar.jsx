import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      // Return false for guest users or non-authenticated users
      return user && user.id && !user.isGuest;
    } catch {
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/', { replace: true });
    window.location.reload();
  };

  const handleAuthAction = (action) => {
    // If user is a guest, remove guest session and reload to clear state
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.isGuest) {
      localStorage.removeItem('user');
      // Use setTimeout to ensure localStorage is cleared before navigation
      setTimeout(() => {
        window.location.href = action === 'signup' ? '/signup' : '/login';
      }, 0);
    } else {
      // For non-guest users, just navigate
      navigate(action === 'signup' ? '/signup' : '/login');
    }
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isGuest = user.isGuest;

  return (
    <NavContainer>
      <NavBrand as={Link} to="/">Tempting but Inedible</NavBrand>
      <NavLinks>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/explore">Explore</NavLink>
        {isAuthenticated() && <NavLink to="/collection">Collection</NavLink>}
      </NavLinks>
      {isAuthenticated() ? (
        <LogoutButton onClick={handleLogout}>
          Logout
        </LogoutButton>
      ) : (
        <AuthButtons>
          <LoginButton onClick={() => handleAuthAction('login')}>
            {isGuest ? 'Switch to Login' : 'Login'}
          </LoginButton>
          <SignupButton onClick={() => handleAuthAction('signup')}>
            {isGuest ? 'Create Account' : 'Sign Up'}
          </SignupButton>
        </AuthButtons>
      )}
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(30, 30, 30, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const NavBrand = styled.h1`
  font-size: 1.5rem;
  color: #646cff;
  margin: 0;
  background: linear-gradient(45deg, #646cff, #ff6b6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-decoration: none;
  cursor: pointer;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;

  &:hover {
    color: #646cff;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(45deg, #646cff, #ff6b6b);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const LoginButton = styled.button`
  padding: 0.5rem 1rem;
  background: transparent;
  color: #646cff;
  border: 1px solid #646cff;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(100, 108, 255, 0.1);
    transform: translateY(-2px);
  }
`;

const SignupButton = styled.button`
  padding: 0.5rem 1rem;
  background: #646cff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #535bf2;
    transform: translateY(-2px);
  }
`;

const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  background: rgba(244, 67, 54, 0.1);
  color: #f44336;
  border: 1px solid rgba(244, 67, 54, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(244, 67, 54, 0.2);
    transform: translateY(-2px);
  }
`;

export default Navbar;