import type { Dispatch, SetStateAction } from "react"
import { type item } from "../types"

export default function DeletionConfirmationModal({item, deleteItem, setShowDelete}: {item: item, deleteItem: () => Promise<void>, setShowDelete: Dispatch<SetStateAction<boolean>>}) {

    return (
        <div className="delete-modal">
            <div className="delete-modal-background"></div>
            <div className="delete-modal-box">
                <div className="box-content">
                    <h3>Are you sure you want to delete {item.itemName}?</h3>
                    <div className="box-btn-container">
                        <button onClick={deleteItem}>Yes</button>
                        <button onClick={() => setShowDelete(false)}>No</button>
                    </div>
                </div>
            </div>
        </div>
    )
}