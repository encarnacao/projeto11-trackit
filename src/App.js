import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Habits from "./components/Habits";
import Header from "./components/Header";
import Login from "./components/Login";
import SignIn from "./components/SignIn";
import Today from "./components/Today";
import History from "./components/History";
import AuthProvider from "./contexts/auth";

function App() {
	const MOCKIMAGE =
		"https://wakatime.com/photo/b4a991a1-1a20-4148-9f89-b1c69527282a?s=420&cache=false&time=1671285163.8742568";
	return (
		<AuthProvider>
			<Header />
			<Routes>
				<Route path="/" element={<Login />} />
				<Route
					path="/cadastro"
					element={<SignIn />}
				/>
				<Route
					path="/habitos"
					element={<Habits />}
				/>
				<Route
					path="/hoje"
					element={<Today />}
				/>
				<Route
					path="/historico"
					element={<History />}
				/>
			</Routes>
			<Footer percentage={66} />
		</AuthProvider>
	);
}

export default App;
