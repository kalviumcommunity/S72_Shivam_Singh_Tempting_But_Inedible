import React, { useEffect, useState } from "react";
import AddEntityForm from "./AddEntityForm";

const Entities = () => {
    const [entities, setEntities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingEntity, setEditingEntity] = useState(null);

    const fetchEntities = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/entities");
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            setEntities(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching entities:", error);
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEntities();
    }, []);

    const handleEntityAdded = () => {
        fetchEntities();
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this item?")) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/entities/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete item');
            }

            fetchEntities();
        } catch (error) {
            console.error('Error deleting entity:', error);
            alert('Failed to delete item. Please try again.');
        }
    };

    const handleEdit = (entity) => {
        setEditingEntity(entity);
    };

    const handleUpdate = async (id, updatedData) => {
        try {
            const response = await fetch(`http://localhost:3000/api/entities/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error('Failed to update item');
            }

            setEditingEntity(null);
            fetchEntities();
        } catch (error) {
            console.error('Error updating entity:', error);
            alert('Failed to update item. Please try again.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <AddEntityForm 
                onEntityAdded={handleEntityAdded}
                editingEntity={editingEntity}
                onUpdate={handleUpdate}
                onCancel={() => setEditingEntity(null)}
            />
            
            <h2 style={{ marginTop: '30px' }}>Current Inedible Items</h2>
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '20px',
                padding: '20px'
            }}>
                {entities.length > 0 ? (
                    entities.map((entity) => (
                        <div key={entity._id} style={{
                            backgroundColor: '#2a2a2a',
                            padding: '15px',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}>
                            {entity.img && (
                                <img 
                                    src={entity.img} 
                                    alt={entity.name}
                                    style={{
                                        width: '100%',
                                        height: '200px',
                                        objectFit: 'cover',
                                        borderRadius: '4px',
                                        marginBottom: '10px'
                                    }}
                                />
                            )}
                            <h3 style={{ color: '#fff', marginBottom: '5px' }}>{entity.name}</h3>
                            <p style={{ color: '#ccc', fontSize: '0.9em', marginBottom: '5px' }}>{entity.description}</p>
                            <span style={{ 
                                backgroundColor: '#646cff',
                                color: '#fff',
                                padding: '3px 8px',
                                borderRadius: '12px',
                                fontSize: '0.8em',
                                marginBottom: '10px',
                                display: 'inline-block'
                            }}>
                                {entity.category}
                            </span>
                            <div style={{ 
                                display: 'flex', 
                                gap: '10px', 
                                marginTop: '10px'
                            }}>
                                <button
                                    onClick={() => handleEdit(entity)}
                                    style={{
                                        backgroundColor: '#4CAF50',
                                        color: 'white',
                                        border: 'none',
                                        padding: '5px 10px',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        flex: 1
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(entity._id)}
                                    style={{
                                        backgroundColor: '#f44336',
                                        color: 'white',
                                        border: 'none',
                                        padding: '5px 10px',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        flex: 1
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No items found. Add some inedible items!</p>
                )}
            </div>
        </div>
    );
};

export default Entities;