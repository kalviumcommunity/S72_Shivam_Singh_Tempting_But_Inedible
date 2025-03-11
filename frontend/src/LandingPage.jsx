import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Entities from "./components/Entities";
import AuthPage from "./components/signup";

const LandingPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return (
    <div className="landing-page">
      {isAuthenticated ? (
        <div>
          <header className="header">
            <h1> Tempting but Inedible(ASAP) </h1>
            <p className="subtitle">
              Welcome to a world where beauty meets deception. Discover our collection of 
              visually stunning but completely inedible treasures. Each item is a testament 
              to the art of visual temptation!
            </p>
          </header>
          
          <main>
            <h2>Forbidden Delights Collection</h2>
            <Entities />
          </main>
      
          <footer>
            <p>Remember: Beauty can be deceiving. Admire with your eyes, not with your appetite!</p>
            <button
              onClick={handleLogout}
              style={{
                padding: '0.8rem 2rem',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                marginTop: '2rem',
                fontSize: '1rem',
                fontWeight: '500',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#d32f2f';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#f44336';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
              }}
            >
              Logout
            </button>
          </footer>
        </div>
      ) : (
        <AuthPage />
      )}
    </div>
  );
};

export default LandingPage;