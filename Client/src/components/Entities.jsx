import React, { useState, useEffect } from 'react';
import Entity from './Entity';

const Entities = () => {
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEntities();
  }, []);

  const fetchEntities = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/entities');
      if (!response.ok) {
        throw new Error('Failed to fetch entities');
      }
      const data = await response.json();
      setEntities(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ color: "#f0f0f0" }}>Loading entities...</div>;
  }

  if (error) {
    return <div style={{ color: "#ff6b6b" }}>Error: {error}</div>;
  }

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      flexWrap: "wrap", 
      gap: "20px" 
    }}>
      {entities.map((entity) => (
        <Entity
          key={entity._id}
          name={entity.name}
          description={entity.description}
          imageUrl={entity.imageUrl}
        />
      ))}
    </div>
  );
};

export default Entities;