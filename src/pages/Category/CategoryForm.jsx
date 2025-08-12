import React, { useState } from 'react';

const CategoryForm = ({ onSubmit, initialData = {} }) => {
    const [name, setName] = useState(initialData.name || '');
    const [description, setDescription] = useState(initialData.description || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() === '') return;
        onSubmit && onSubmit({ name, description });
        setName('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Category Name:
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Description:
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </label>
            </div>
            <button type="submit">Save Category</button>
        </form>
    );
};

export default CategoryForm;