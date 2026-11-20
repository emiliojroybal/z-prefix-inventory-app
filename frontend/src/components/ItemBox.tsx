

export function ItemBox({ item, setSelectedItem }: { item: object; setSelectedItem: Function }) {
    let itemDescription = item.description;
    if (itemDescription.length > 100) {
        itemDescription = itemDescription.slice(0, 100) + "...";
    }

    return (
        <button className="itemBox" onClick={() => setSelectedItem(item)}>
            <h3>{item.itemName}</h3>
            <p>{itemDescription}</p>
            <p>Quantity: {item.quantity}</p>
        </button>
    )
}