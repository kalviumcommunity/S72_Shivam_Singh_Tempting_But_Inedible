import React from 'react';

const Entity = ({ name, description, imageUrl }) => {
  return (
    <div style={{ 
      border: "2px solid #444", 
      padding: "10px", 
      borderRadius: "10px", 
      width: "200px",
      backgroundColor: "#1e1e1e"
    }}>
      <img 
        src={imageUrl} 
        alt={name} 
        style={{ 
          width: "100%", 
          borderRadius: "5px" 
        }} 
      />
      <h3 style={{ color: "#f0f0f0", margin: "10px 0" }}>{name}</h3>
      {description && <p style={{ color: "#ccc" }}>{description}</p>}
    </div>
  );
};

export default Entity;