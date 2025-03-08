import React, { useEffect, useState } from "react";

const App = () => {
    const [entities, setEntities] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/entities")
            .then((res) => res.json())
            .then((data) => setEntities(data))
            .catch((err) => console.error("Error fetching entities:", err));
    }, []);

    return (
        <div>
            <h1>Entities from MongoDB</h1>
            <ul>
                {entities.map((entity, index) => (
                    <li key={index}>
                        <strong>{entity.name}</strong>: {entity.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
