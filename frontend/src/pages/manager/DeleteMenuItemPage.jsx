import React from 'react';
import axios from 'axios'; 
import './DeleteMenuItemPage.css'; 

export default function DeleteMenuItemPage({ id }) {
    
    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this product from your menu?")) return;
        
        try {

            await axios.delete(`/menu/item/${id}`);
            window.location.reload(); 
        } catch (err) {
            console.error("Deletion failed:", err);
            alert("An error occurred during the deletion process.");
        }
    };

    return (
        <button className="btn-delete-item" onClick={handleDelete}>
            🗑️ Delete
        </button>
    );
}