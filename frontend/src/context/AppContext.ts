import { createContext } from "react";
import { type user } from "../types";

export default createContext<user | null>(null);