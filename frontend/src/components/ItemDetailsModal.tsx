import { useContext, useState, type Dispatch, type SetStateAction } from "react";
import DeletionConfirmationModal from "./DeletionConfirmationModal";
import AppContext from "../context/AppContext";
import axios from "axios";
import { type item } from "../types"

export function ItemDetailsModal({ item, setSelectedItem, setInventoryRefresh }: { item: item; setSelectedItem: Dispatch<SetStateAction<item | null>> , setInventoryRefresh: Dispatch<SetStateAction<boolean>>  }) {
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        itemName: item.itemName,
        description: item.description,
        quantity: item.quantity
    });
    const [showDelete, setShowDelete] = useState(false);

    const loggedInUser = useContext(AppContext);

    const patchItem = async () => {
        await axios.patch(`http://localhost:3000/items/${item.id}`, formData);
        setEditMode(false);
        setSelectedItem({
            ...item,
            itemName: formData.itemName,
            description: formData.description,
            quantity: formData.quantity
        });
        setInventoryRefresh(true);
    }

    const deleteItem = async (): Promise<void> => {
        await axios.delete(`http://localhost:3000/items/${item.id}`);
        setEditMode(false);
        setShowDelete(false);
        setSelectedItem(null);
        setInventoryRefresh(true);
    }

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        patchItem();
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
            <div className="modal-background" onClick={() => setSelectedItem(null)}></div>
            <div className="modal-box">
                <div className="box-header">
                    <button className="x-button" onClick={() => setSelectedItem(null)}>X</button>
                </div>
                {editMode ? 
                    <form className="box-content" onSubmit={handleSubmit}>
                        <div className="box-title">
                            <h3><input type="text" name="itemName" value={formData.itemName} onChange={handleChange}></input></h3>
                            <p>Posted by: {item.user["firstName"]} {item.user["lastName"]} ({item.user["username"]})</p>
                            <button onClick={() => setEditMode(false)}>View Mode</button>
                            <button type="button" onClick={() => setShowDelete(true)}>Delete Item</button>
                        </div>
                        <div className="form-entry-field">
                            <textarea style={{width: "100%", maxWidth: "20rem", boxSizing: "border-box"}} name="description" rows={4} cols={40} value={formData.description} onChange={handleChange}></textarea>
                        </div>
                        <div className="form-entry-field">
                            <p>Quantity: <input type="text" inputMode="numeric" name="quantity" value={formData.quantity} onChange={handleChange}></input></p>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                    : 
                    <div className="box-content">
                        <div className="box-title">
                            <h3>{item.itemName}</h3>
                            <p>Posted by: {item.user["firstName"]} {item.user["lastName"]} ({item.user["username"]})</p>
                            {loggedInUser && item.user["id"] == loggedInUser.id ? <button onClick={() => setEditMode(true)}>Edit Mode</button> : ""}
                        </div>
                        <p className="box-description">{item.description}</p>
                        <p>Quantity: {item.quantity}</p>
                    </div>
                }
            </div>
            {showDelete ? <DeletionConfirmationModal item={item} deleteItem={deleteItem} setShowDelete={setShowDelete} /> : ""}
        </div>
    )
}