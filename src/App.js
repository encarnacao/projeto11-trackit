import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Habits from "./components/Habits";
import Header from "./components/Header";
import Login from "./components/Login";
import SignIn from "./components/SignIn";
import Today from "./components/Today";
import History from "./components/History";

function App() {
    const [visible, setVisible] = useState(false);
    const MOCKIMAGE =
        "https://wakatime.com/photo/b4a991a1-1a20-4148-9f89-b1c69527282a?s=420&cache=false&time=1671285163.8742568";
    return (
        <div className="App">
            <Header visible={visible} userImage={MOCKIMAGE} />
            <Routes>
                <Route path="/" element={<Login setVisible={setVisible} />} />
                <Route
                    path="/cadastro"
                    element={<SignIn setVisible={setVisible} />}
                />
                <Route
                    path="/habitos"
                    element={<Habits setVisible={setVisible} />}
                />
                <Route path="/hoje" element={<Today setVisible={setVisible}/>} />
                <Route path="/historico" element={<History setVisible={setVisible}/>} />
            </Routes>
            <Footer visible={visible} percentage={66} />
        </div>
    );
}

export default App;
