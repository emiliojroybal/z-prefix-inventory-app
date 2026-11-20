import { useState } from "react";
import { LoginModal } from "../components/LoginModal";

export function NavBar() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <nav>
            {showLogin ? <LoginModal setShowLogin={setShowLogin}/> : ""}
            <button className="main-logo"><h1>Inventory App</h1></button>
            <button className="login-btn" onClick={() => setShowLogin(true)}>Login</button>
        </nav>
    )
}