import type { Dispatch, SetStateAction } from "react";
import { type item } from "../types"

export function ItemBox({ item, setSelectedItem }: { item: item; setSelectedItem: Dispatch<SetStateAction<item | null>>}) {

    let itemDescription = item.description;
    if (itemDescription.length > 100) {
        itemDescription = itemDescription.slice(0, 100) + "...";
    }

    return (
        <button className="itemBox" onClick={() => setSelectedItem(item)}>
            <h3 className="itemBoxTitle">{item.itemName}</h3>
            <p className="itemBoxDescription">{itemDescription}</p>
            <p className="itemBoxQuantity">Quantity: {item.quantity}</p>
        </button>
    )
}