import React, { useState } from "react"
import axios from "axios";

export function SignUpModal({setShowSignUp, setLoggedInUser}: {setShowSignUp: Function, setLoggedInUser: Function}) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: ""
    });

    const attemptSignUp = async () => {
        const response = await axios.post("http://localhost:3000/users", formData);

        console.log(response.data);
        setLoggedInUser(response.data);
        setShowSignUp(false);
    }

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        attemptSignUp();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value}));
    }

    return (
        <div className="modal">
            <div className="modal-background" onClick={() => setShowSignUp(false)}></div>
            <div className="modal-box">
                <div className="box-header">
                    <button className="x-button" onClick={() => setShowSignUp(false)}>X</button>
                </div>
                <form className="box-content" onSubmit={handleSubmit}>
                    <h3>Sign Up</h3>
                    <div className="form-entry-field">
                        <p>First Name</p>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}></input>
                    </div>
                    <div className="form-entry-field">
                        <p>Last Name</p>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}></input>
                    </div>
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