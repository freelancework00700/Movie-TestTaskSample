import { useContext } from "react";
import { AppContext } from "./AuthContext";

export const useAuthContext = () => useContext(AppContext);
