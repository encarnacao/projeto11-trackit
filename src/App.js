import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Habits from "./components/Habits";
import Header from "./components/Header";
import Login from "./components/Login";
import Today from "./components/Today";
import History from "./components/History";
import AuthProvider from "./contexts/auth";
import SignUp from "./components/SignUp";

function App() {
	return (
		<AuthProvider>
			<Header />
			<Routes>
				<Route path="/" element={<Login />} />
				<Route
					path="/cadastro"
					element={<SignUp />}
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
