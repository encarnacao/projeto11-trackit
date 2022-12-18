import { createContext, useState } from "react";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [userImage, setUserImage] = useState("");
    const [visible, setVisible] = useState(false);
    const [token, setToken] = useState("");
    const [todayHabits, setTodayHabits] = useState(undefined);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    function autoLogin(){
        setToken(localStorage.token);
        setUserImage(localStorage.userImage);
    }
    return (
        <AuthContext.Provider value={{ userImage, config, setToken, setUserImage, visible, setVisible, todayHabits, setTodayHabits, autoLogin}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;