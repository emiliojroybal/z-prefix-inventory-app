import React, { useState, useContext, type Dispatch, type SetStateAction } from "react";
import axios from "axios";
import AppContext from "../context/AppContext";
import {type user } from "../types";

export default function NewItemModal({setShowNewItem, setInventoryRefresh}: {setShowNewItem: Dispatch<SetStateAction<boolean>>, setInventoryRefresh: Dispatch<SetStateAction<boolean>>}) {
    const [formData, setFormData] = useState({
        itemName: "",
        description: "",
        quantity: 0
    });

    const loggedInUser = useContext<user | null>(AppContext);

    const createNewItem = async () => {
        const itemObject = {
            ...formData, 
            userID: loggedInUser?.id,
        };
        const response = await axios.post("http://localhost:3000/items", itemObject);
        console.log(response);
        setShowNewItem(false);
        setInventoryRefresh(true);
    }

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        createNewItem();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        let { name, value } = e.target;
        if (name == "quantity") {
            value = value.replace(/\D/g, '')
        }
        setFormData((prev) => ({ ...prev, [name]: value}));
    }

    return (
        <div className="modal">
            <div className="modal-background" onClick={() => setShowNewItem(false)}></div>
            <div className="modal-box">
                <div className="box-header">
                    <button className="x-button" onClick={() => setShowNewItem(false)}>X</button>
                </div>
                <form className="box-content" onSubmit={handleSubmit}>
                    <h3>New Item</h3>
                    <div className="form-entry-field">
                        <p>Item Name</p>
                        <input type="text" name="itemName" value={formData.itemName} onChange={handleChange} required></input>
                    </div>
                    <div className="form-entry-field">
                        <p>Description</p>
                        <textarea style={{width: "100%", maxWidth: "20rem", boxSizing: "border-box"}} name="description" rows={4} cols={40} value={formData.description} onChange={handleChange}></textarea>
                    </div>
                    <div className="form-entry-field">
                        <p>Quantity</p>
                        <input type="text" inputMode="numeric" name="quantity" value={formData.quantity} onChange={handleChange}></input>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}