import React from "react";
import Entities from "./components/Entities";

const LandingPage = () => {
  return (  
    <div style={{ 
      textAlign: "center", 
      fontFamily: "Arial, sans-serif", 
      padding: "20px",
      backgroundColor: "#121212",
      color: "#f0f0f0",
      minHeight: "100vh"
    }}>
      <h1>🥄 Tempting but Inedible 🍭</h1>
      <p>Welcome to ASAP (As Silly As Possible) – where things look delicious but shouldn't be eaten! 😆</p>
      
      <h2>🧐 Things You Should NOT Eat:</h2>
      <Entities />
  
      <p style={{ marginTop: "20px" }}>🥄 Remember, just because it looks tasty, doesn't mean it is! 😂</p>
    </div>
  );
};

export default LandingPage;