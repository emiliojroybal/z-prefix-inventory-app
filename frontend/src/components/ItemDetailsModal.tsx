import { useEffect } from "react";


export function ItemDetailsModal({ item, setSelectedItem }: { item: object; setSelectedItem: Function }) {

    return (
        <div className="modal">
            <div className="modal-background" onClick={() => setSelectedItem(null)}></div>
            <div className="modal-box">
                <div className="box-header">
                    <button className="x-button" onClick={() => setSelectedItem(null)}>X</button>
                </div>
                <div className="box-content">
                    <div className="box-title">
                        <h3>{item.itemName}</h3>
                        <p>Posted by: {item.user["firstName"]} {item.user["lastName"]} ({item.user["username"]})</p>
                    </div>
                    <p className="box-description">{item.description}</p>
                    <p>Quantity: {item.quantity}</p>
                </div>
            </div>
        </div>
    )
}