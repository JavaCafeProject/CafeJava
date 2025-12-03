import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import menuApi from '../../api/menuApi';
import './EditMenuItemPage.css'; 

const EditMenuItemPage = () => {
    const { categoryId, itemId } = useParams();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({
        name: "",
        price: "",
        description: "",
        imageUrl: "",
        categoryId: ""
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                const catRes = await menuApi.getAllCategories();
                setCategories(catRes.data);

                const itemRes = await menuApi.getItemById(categoryId, itemId);
                const item = itemRes.data;

                setForm({
                    name: item.name,
                    price: item.price,
                    description: item.description,
                    imageUrl: item.imageUrl,
                    categoryId: item.categoryId || categoryId // Backend categoryId dönmezse URL'den al
                });

            } catch (err) {
                console.error("Data upload error:", err);
            }
        };
        loadData();
    }, [categoryId, itemId]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await menuApi.updateItem(itemId, {
                ...form,
                categoryId: Number(form.categoryId)
            });
            alert("The product has been updated successfully!");
            navigate("/manager/menu");
        } catch (err) {
            console.error(err);
            alert("Update failed.");
        }
    };

    return (
        <div className="edit-menu-container">
            <div className="edit-menu-card">
                <h2 className="edit-title">Update Item</h2>
                
                <form onSubmit={handleSubmit} className="edit-form">
                    
                    <input 
                        className="form-input"
                        required 
                        name="name" 
                        value={form.name} 
                        onChange={handleChange} 
                        placeholder="Item Name" 
                    />
                    
                    <input 
                        className="form-input"
                        required 
                        name="price" 
                        type="number" 
                        step="0.01"
                        value={form.price} 
                        onChange={handleChange} 
                        placeholder="Price" 
                    />
                    
                    <textarea 
                        className="form-textarea"
                        name="description" 
                        value={form.description} 
                        onChange={handleChange} 
                        placeholder="Description" 
                    />
                    
                    <input 
                        className="form-input"
                        name="imageUrl" 
                        value={form.imageUrl} 
                        onChange={handleChange} 
                        placeholder="Image URL" 
                    />

                    <select 
                        className="form-select"
                        name="categoryId" 
                        value={form.categoryId} 
                        onChange={handleChange}
                    >
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>

                    <div className="form-actions">
                        <button 
                            type="button" 
                            className="btn-action btn-cancel"
                            onClick={() => navigate('/manager/menu')}
                        >
                            Cancel
                        </button>
                        
                        <button 
                            type="submit" 
                            className="btn-action btn-update"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditMenuItemPage;