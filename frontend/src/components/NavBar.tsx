import { useState, useContext, type Dispatch, type SetStateAction } from "react";
import { LoginModal } from "../components/LoginModal";
import { SignUpModal } from "./SignUpModal";
import AppContext from "../context/AppContext";
import axios from "axios";
import type { user } from "../types";

export function NavBar({setLoggedInUser}: {setLoggedInUser: Dispatch<SetStateAction<user | null>> }) {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const loggedInUser = useContext<user | null>(AppContext);

    const logout = async () => {
        const response = await axios.post("http://localhost:3000/logout", {}, {
            withCredentials: true,
        })

        setLoggedInUser(null);
        return response;
    }

    return (
        <nav>
            {showLogin ? <LoginModal setShowLogin={setShowLogin} setLoggedInUser={setLoggedInUser} setShowSignUp={setShowSignUp}/> : ""}
            {showSignUp ? <SignUpModal setLoggedInUser={setLoggedInUser} setShowSignUp={setShowSignUp}/> : ""}
            <button className="main-logo"><h1>Inventory App</h1></button>
            <div className="nav-login-container">
                {loggedInUser ? loggedInUser.username : ""}
                <button className="login-btn" onClick={loggedInUser ? () => logout() : () => setShowLogin(true)}>{loggedInUser ? "Logout" : "Login"}</button>
            </div>
        </nav>
    )
}