import { createContext, useState } from "react";
import useStickyState from "../hooks/sticky";

export const AuthContext = createContext({});

function AuthProvider({ children }) {

    const [visible, setVisible] = useState(false);
    const [token, setToken] = useStickyState("", "token");
    const [userImage, setUserImage] = useStickyState("", "userImage");
    const [todayHabits, setTodayHabits] = useState(undefined);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    return (
        <AuthContext.Provider value={{ userImage, token, config, setToken, setUserImage, visible, setVisible, todayHabits, setTodayHabits}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;