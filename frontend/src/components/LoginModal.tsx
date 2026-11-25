import React, { useState, type Dispatch, type SetStateAction } from "react"
import { type user, type ApiErrorResponse } from "../types";
import axios from "axios";

export function LoginModal({setShowLogin, setLoggedInUser, setShowSignUp}: {setShowLogin: Dispatch<SetStateAction<boolean>>, setLoggedInUser: Dispatch<SetStateAction<user | null>> , setShowSignUp: Dispatch<SetStateAction<boolean>>}) {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [loginErrorText, setLoginErrorText] = useState<string>("");

    const attemptLogin = async () => {
        try {
            const response = await axios.post("http://localhost:3000/login", formData, {
                withCredentials: true,
            });

            console.log(response.data);
            setLoggedInUser(response.data);
            setShowLogin(false);

        } catch (error: unknown) {
            if (axios.isAxiosError<ApiErrorResponse>(error)) {
                if (error.response) {
                    const apiError = error.response.data;
                    setLoginErrorText(apiError?.message || error.message);
                }
            }
        }
    }

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
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
                        <input type="text" name="username" value={formData.username} onChange={handleChange} required></input>
                    </div>
                    <div className="form-entry-field">
                        <p>Password</p>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required></input>
                    </div>
                    <p className="error-text" hidden={loginErrorText == ""}>{loginErrorText}</p>
                    <button className="account-register-text" type="button" onClick={switchToSignUp}>Register for an account</button>
                    <button type="submit" onClick={() => setLoginErrorText("")}>Submit</button>
                </form>
            </div>
        </div>
    )
}