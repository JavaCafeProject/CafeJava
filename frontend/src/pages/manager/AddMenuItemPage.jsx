import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import menuApi from '../../api/menuApi';
import './AddMenuItemPage.css'; 

const AddMenuItemPage = () => {
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
        const fetchCats = async () => {
            try {
                const res = await menuApi.getAllCategories();
                setCategories(res.data);
                if(res.data.length > 0) {
                    setForm(prev => ({...prev, categoryId: res.data[0].id}));
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchCats();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await menuApi.createItem({
                ...form,
                categoryId: Number(form.categoryId) 
            });
            alert("The product has been successfully added to the menu!");
            navigate("/manager/menu");
        } catch (err) {
            console.error("insertion error:", err);
            alert("An error occurred while adding the product.");
        }
    };

    return (
        <div className="add-menu-container">
            <div className="add-menu-card">
                <h2 className="form-title">Add New Item</h2>
                
                <form onSubmit={handleSubmit} className="menu-form">
                    
                    <input 
                        className="form-input"
                        required 
                        placeholder="Item Name (Ex: Latte)" 
                        name="name" 
                        value={form.name} 
                        onChange={handleChange} 
                    />
                    
                    <input 
                        className="form-input"
                        required 
                        placeholder="Price ($)" 
                        name="price" 
                        type="number" 
                        step="0.01" 
                        value={form.price} 
                        onChange={handleChange} 
                    />
                    
                    <textarea 
                        className="form-textarea"
                        placeholder="Product Description (Ingredients, etc.)" 
                        name="description" 
                        value={form.description} 
                        onChange={handleChange} 
                    />
                    
                    <input 
                        className="form-input"
                        placeholder="Image URL (https://...)" 
                        name="imageUrl" 
                        value={form.imageUrl} 
                        onChange={handleChange} 
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
                            className="btn-action btn-save"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMenuItemPage;