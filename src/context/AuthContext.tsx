"use client";

import React, {
    Dispatch,
    createContext,
    SetStateAction,
    useState,
    ReactNode,
} from "react";

interface Children {
    children?: ReactNode;
}

interface AppcontextInterFace {
    isAuthenticated: string | null;
    setisAuthenticated: Dispatch<SetStateAction<string | null>>;
    userId: string | null;
    setUserId: Dispatch<SetStateAction<string | null>>;
}


const initialState: AppcontextInterFace = {
    isAuthenticated: null,
    setisAuthenticated: () => undefined,
    userId: null,
    setUserId: () => undefined,
};

export const AppContext = createContext(initialState);


const AuthContext = ({ children, ...props }: Children) => {
    const [isAuthenticated, setisAuthenticated] = useState<string | null>(() => {
        if (typeof window !== "undefined") {
            if (localStorage.getItem("token")) {
                return localStorage.getItem("token");
            }
            return null;
        }
        return null;
    });

    const [userId, setUserId] = useState<string | null>(() => {
        if (typeof window !== "undefined") {
            if (localStorage.getItem("userId")) {
                return localStorage.getItem("userId");
            }
            return null;
        }
        return null;
    });

    const values = {
        isAuthenticated,
        setisAuthenticated,
        userId,
        setUserId,
    };
    return (
        <AppContext.Provider {...props} value={values}>
            {children}
        </AppContext.Provider>
    );
};

export { AuthContext };