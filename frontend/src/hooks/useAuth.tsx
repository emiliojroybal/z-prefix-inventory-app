import { useState, useEffect, type Dispatch, type SetStateAction } from "react";
import axios from "axios";
import type { user } from "../types";

export default function useAuth(): [user | null, Dispatch<SetStateAction<user | null>>] {
  const [loggedInUser, setLoggedInUser] = useState<user | null>(null)

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