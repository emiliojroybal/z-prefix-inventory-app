import { useEffect, useState } from "react"
import { ItemBox } from "../components/ItemBox";
import { ItemDetailsModal } from "../components/ItemDetailsModal";

export function MainPage() {
    const [inventory, setInventory] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            const data = await fetch("http://localhost:3000/items?expandUser=true");
            const jsonData = await data.json();

            setInventory(jsonData)
        }

        fetchItems();
    }, [])

    return (
        <div className="main-page">
            {selectedItem ? <ItemDetailsModal item={selectedItem} setSelectedItem={setSelectedItem} /> : ""}
            <h1>Inventory</h1>
            <div className="inventory-grid">
                {inventory.map((item) => {
                    return <ItemBox item={item} setSelectedItem={setSelectedItem} />
                })}
            </div>
        </div>
    )
}