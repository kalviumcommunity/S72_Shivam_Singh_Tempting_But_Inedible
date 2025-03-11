import React, { useEffect, useState } from "react";

const Entities = () => {
    const [entities, setEntities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/api/entities") // Change URL if backend is deployed
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                return response.json();
            })
            .then((data) => {
                setEntities(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching entities:", error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Entities from Database</h2>
            <ul>
                {entities.length > 0 ? (
                    entities.map((entity) => (
                        <li key={entity._id}>
                            <strong>{entity.name}</strong>: {entity.description}
                        </li>
                    ))
                ) : (
                    <p>No entities found</p>
                )}
            </ul>
        </div>
    );
};

export default Entities;

