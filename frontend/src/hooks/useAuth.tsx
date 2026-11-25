import { useState, useEffect, type Dispatch, type SetStateAction } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import type { user } from "../types";

export default function useAuth(): [user | null, Dispatch<SetStateAction<user | null>>] {
  const [loggedInUser, setLoggedInUser] = useState<user | null>(null)
  const [cookies] = useCookies(['accessToken']);

  const hasCookie = Boolean(cookies.accessToken);

  useEffect(() => {
    const attemptLogin = async () => {
      const response = await axios.get("http://localhost:3000/auth/me", {
        withCredentials: true,
      });

      setLoggedInUser(response.data);
    }

     if (hasCookie) attemptLogin();
  }, [])

  return [loggedInUser, setLoggedInUser];
}