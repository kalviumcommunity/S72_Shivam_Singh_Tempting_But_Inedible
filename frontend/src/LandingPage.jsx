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
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem' }}>
              <button
                onClick={handleLogout}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#d32f2f'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#f44336'}
              >
                Logout
              </button>
            </div>
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
            <p>Remember: Beauty can be deceiving. Admire with your eyes, not with your appetite! </p>
          </footer>
        </div>
      ) : (
        <AuthPage />
      )}
    </div>
  );
};

export default LandingPage;