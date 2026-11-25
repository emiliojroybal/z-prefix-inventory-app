import React, { useState, type Dispatch, type SetStateAction } from "react"
import { type user } from "../types";
import axios from "axios";

export function LoginModal({setShowLogin, setLoggedInUser, setShowSignUp}: {setShowLogin: Dispatch<SetStateAction<boolean>>, setLoggedInUser: Dispatch<SetStateAction<user | null>> , setShowSignUp: Dispatch<SetStateAction<boolean>>}) {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const attemptLogin = async () => {
        const response = await axios.post("http://localhost:3000/login", formData, {
            withCredentials: true,
        });

        console.log(response.data);
        setLoggedInUser(response.data);
        setShowLogin(false);
    }

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        console.log(`Submitting username ${formData.username} and password ${formData.password}`)
        attemptLogin();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value}));
    }

    const switchToSignUp = () => {
        setShowLogin(false);
        setShowSignUp(true);
    }

    return (
        <div className="modal">
            <div className="modal-background" onClick={() => setShowLogin(false)}></div>
            <div className="modal-box">
                <div className="box-header">
                    <button className="x-button" onClick={() => setShowLogin(false)}>X</button>
                </div>
                <form className="box-content" onSubmit={handleSubmit}>
                    <h3>Login</h3>
                    <div className="form-entry-field">
                        <p>Username</p>
                        <input type="text" name="username" value={formData.username} onChange={handleChange}></input>
                    </div>
                    <div className="form-entry-field">
                        <p>Password</p>
                        <input type="password" name="password" value={formData.password} onChange={handleChange}></input>
                    </div>
                    <button className="account-register-text" type="button" onClick={switchToSignUp}>Register for an account</button>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}