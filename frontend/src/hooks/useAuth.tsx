import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth() {
  const [loggedInUser, setLoggedInUser] = useState(null)

  useEffect(() => {
    const attemptLogin = async () => {
      const response = await axios.get("http://localhost:3000/auth/me", {
        withCredentials: true,
      });

      setLoggedInUser(response.data);
    }

    attemptLogin();
  }, [])

  return [loggedInUser, setLoggedInUser];
}