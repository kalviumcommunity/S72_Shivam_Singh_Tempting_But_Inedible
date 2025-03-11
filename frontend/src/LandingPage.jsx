// LandingPage.js
import React, { useState } from "react";
import Entities from "./components/Entities";
import AuthPage from "./components/AuthPage";

const LandingPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
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
            <p>Remember: Beauty can be deceiving. Admire with your eyes, not with your appetite! </p>
          </footer>
        </div>
      ) : (
        <AuthPage handleLogin={handleLogin} />
      )}
    </div>
  );
};

export default LandingPage;