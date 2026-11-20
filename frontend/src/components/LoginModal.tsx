import React, { useState } from "react"
import axios from "axios";

export function LoginModal({setShowLogin}: {setShowLogin: Function}) {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const attemptLogin = async () => {
        const response = await axios.post("http://localhost:3000/login", formData, {
            withCredentials: true,
        });

        console.log(response.data);
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
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}