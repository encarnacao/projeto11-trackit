import axios from "axios";
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

    const updateHabits = () => {
        axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)
		.then((response) => {
			setTodayHabits(response.data);
		})
		.catch(() => {
			alert("Erro ao requisitar dados do servidor. Por favor logue novamente.");
            window.location.href = "/";
		});
    }

    return (
        <AuthContext.Provider value={{ userImage, token, config, setToken, setUserImage, visible, setVisible, updateHabits, todayHabits, setTodayHabits}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;