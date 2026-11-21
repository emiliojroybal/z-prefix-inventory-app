import { useState, useContext } from "react";
import { LoginModal } from "../components/LoginModal";
import AppContext from "../context/AppContext";
import axios from "axios";

export function NavBar({setLoggedInUser}: {setLoggedInUser: Function}) {
    const [showLogin, setShowLogin] = useState(false);
    const loggedInUser = useContext(AppContext);

    const logout = async () => {
        const response = await axios.post("http://localhost:3000/logout", {}, {
            withCredentials: true,
        })

        setLoggedInUser(null);
        return response;
    }

    return (
        <nav>
            {showLogin ? <LoginModal setShowLogin={setShowLogin} setLoggedInUser={setLoggedInUser}/> : ""}
            <button className="main-logo"><h1>Inventory App</h1></button>
            <div className="nav-login-container">
                {loggedInUser ? loggedInUser.username : ""}
                <button className="login-btn" onClick={loggedInUser ? () => logout() : () => setShowLogin(true)}>{loggedInUser ? "Logout" : "Login"}</button>
            </div>
        </nav>
    )
}