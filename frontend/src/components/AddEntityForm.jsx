import React, { useState, useEffect } from 'react';

const AddEntityForm = ({ onEntityAdded, editingEntity, onUpdate, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        customCategory: '',
        img: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const categories = [
        { value: 'non-eatable', label: 'Non Eatable' },
        { value: 'non-drinkable', label: 'Non Drinkable' },
        { value: 'others', label: 'Others' }
    ];

    useEffect(() => {
        if (editingEntity) {
            const isCustomCategory = !categories.some(cat => cat.value === editingEntity.category);
            setFormData({
                name: editingEntity.name,
                description: editingEntity.description || '',
                category: isCustomCategory ? 'others' : editingEntity.category,
                customCategory: isCustomCategory ? editingEntity.category : '',
                img: editingEntity.img || ''
            });
        }
    }, [editingEntity]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        const submissionData = {
            ...formData,
            category: formData.category === 'others' ? formData.customCategory : formData.category
        };
        
        try {
            if (editingEntity) {
                // Update existing entity
                const response = await fetch(`http://localhost:3000/api/entities/${editingEntity._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(submissionData),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to update entity');
                }

                onUpdate && onUpdate(editingEntity._id, submissionData);
            } else {
                // Create new entity
                const response = await fetch('http://localhost:3000/api/entities', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(submissionData),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to create entity');
                }

                const data = await response.json();
                console.log('Entity created:', data);
                onEntityAdded && onEntityAdded();
            }
            
            // Reset form
            setFormData({
                name: '',
                description: '',
                category: '',
                customCategory: '',
                img: ''
            });

            if (editingEntity) {
                onCancel();
            }
        } catch (error) {
            console.error('Error:', error);
            setError(error.message || 'Failed to process request. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div style={{ 
            maxWidth: '500px', 
            margin: '20px auto',
            padding: '20px',
            backgroundColor: '#2a2a2a',
            borderRadius: '8px'
        }}>
            <h2 style={{ color: '#fff', marginBottom: '20px' }}>
                {editingEntity ? 'Edit Inedible Item' : 'Add New Inedible Item'}
            </h2>
            {error && (
                <div style={{
                    padding: '10px',
                    backgroundColor: '#ff4444',
                    color: '#fff',
                    borderRadius: '4px',
                    marginBottom: '15px'
                }}>
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Item Name"
                    required
                    style={{
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #444',
                        backgroundColor: '#1a1a1a',
                        color: '#fff'
                    }}
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    style={{
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #444',
                        backgroundColor: '#1a1a1a',
                        color: '#fff',
                        minHeight: '100px'
                    }}
                />
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    style={{
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #444',
                        backgroundColor: '#1a1a1a',
                        color: '#fff'
                    }}
                >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>
                            {cat.label}
                        </option>
                    ))}
                </select>
                
                {formData.category === 'others' && (
                    <input
                        type="text"
                        name="customCategory"
                        value={formData.customCategory}
                        onChange={handleChange}
                        placeholder="Enter Custom Category"
                        required
                        style={{
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #444',
                            backgroundColor: '#1a1a1a',
                            color: '#fff'
                        }}
                    />
                )}
                
                <input
                    type="url"
                    name="img"
                    value={formData.img}
                    onChange={handleChange}
                    placeholder="Image URL"
                    style={{
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #444',
                        backgroundColor: '#1a1a1a',
                        color: '#fff'
                    }}
                />
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        type="submit"
                        disabled={loading || (formData.category === 'others' && !formData.customCategory)}
                        style={{
                            padding: '10px',
                            backgroundColor: loading ? '#4a4a4a' : '#646cff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontSize: '16px',
                            flex: 1
                        }}
                    >
                        {loading ? 'Processing...' : (editingEntity ? 'Update Item' : 'Add Item')}
                    </button>
                    {editingEntity && (
                        <button
                            type="button"
                            onClick={onCancel}
                            style={{
                                padding: '10px',
                                backgroundColor: '#666',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '16px',
                                flex: 1
                            }}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default AddEntityForm;