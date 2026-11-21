import React, { useContext, useEffect, useState } from "react"
import { ItemBox } from "../components/ItemBox";
import { ItemDetailsModal } from "../components/ItemDetailsModal";
import axios from "axios";
import AppContext from "../context/AppContext";

export function MainPage() {
    const [inventory, setInventory] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showOwnItems, setShowOwnItems] = useState(true);

    const loggedInUser = useContext(AppContext);

    useEffect(() => {
        const fetchItems = async () => {
            let response = await axios.get("http://localhost:3000/items?expandUser=true");

            setInventory(response.data);
        }

        fetchItems();
        setShowOwnItems(true);
    }, [loggedInUser])

    const handleShowOwnItemsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowOwnItems(e.target.checked);
    }

    return (
        <div className="main-page">
            {selectedItem ? <ItemDetailsModal item={selectedItem} setSelectedItem={setSelectedItem} /> : ""}
            <div className="inventory-title-container">
                <h1>{loggedInUser ? "My Inventory" : "Inventory"}</h1>
                {loggedInUser ? <div>Show only my items: <input type="checkbox" name="showOwnItems" checked={showOwnItems} onChange={handleShowOwnItemsChange}/></div> : ""}
            </div>
            {loggedInUser ? <button>+ New Item</button> : ""}
            <div className="inventory-grid">
                {inventory.filter((item) => !loggedInUser || !showOwnItems || item.user["id"] === loggedInUser.id).map((item) => {
                    return <ItemBox item={item} setSelectedItem={setSelectedItem} />
                })}
            </div>
        </div>
    )
}