import React, { useState, useEffect } from 'react';

const AddEntityForm = ({ onEntityAdded, editingEntity, onUpdate, onCancel, userId }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        customCategory: '',
        img: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Predefined categories for the form
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

    // Function to validate form inputs
    const validateForm = () => {
        if (!formData.name.trim()) return 'Item Name is required.';
        if (!formData.category) return 'Category is required.';
        if (formData.category === 'others' && !formData.customCategory.trim()) return 'Custom category is required.';
        // if (formData.img && !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/.test(formData.img)) return 'Enter a valid image URL (jpg, png, gif, webp).';
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        // Perform validation before submission
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }
        
        setLoading(true);
        
        const submissionData = {
            ...formData,
            category: formData.category === 'others' ? formData.customCategory : formData.category,
            userId
        };
        
        try {
            // Updated API endpoint to use Render backend
            const baseUrl = 'https://s72-shivam-singh-tempting-but-inedible.onrender.com';
            
            if (editingEntity) {
                const response = await fetch(`${baseUrl}/api/entities/${editingEntity._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(submissionData),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to update entity');
                }
                onUpdate && onUpdate(editingEntity._id, submissionData);
            } else {
                const response = await fetch(`${baseUrl}/api/entities`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(submissionData),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to create entity');
                }

                onEntityAdded && onEntityAdded();
            }
            
            // Reset form after successful submission
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
        <div className="form-container">
            <h2>{editingEntity ? 'Edit Inedible Item' : 'Add New Inedible Item'}</h2>
            {error && <div className="error-container">{error}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Item Name"
                    required
                    className="form-input"
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="form-input"
                />
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="form-input"
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
                        className="form-input"
                    />
                )}
                <input
                    type="url"
                    name="img"
                    value={formData.img}
                    onChange={handleChange}
                    placeholder="Image URL"
                    className="form-input"
                />
                <div className="button-group">
                    <button
                        type="submit"
                        disabled={loading}
                        className="submit-button"
                    >
                        {loading ? 'Processing...' : (editingEntity ? 'Update Item' : 'Add Item')}
                    </button>
                    {editingEntity && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="button"
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
