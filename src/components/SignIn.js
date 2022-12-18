import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { StyledButton, TextInput } from "../styles/GlobalStyles";
import Loading from "./Loading";
import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/auth";

export default function SignIn() {
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState({
		email: "",
		password: "",
		name: "",
		image: "",
	});
	const {setVisible} = useContext(AuthContext);
	const navigate = useNavigate();
	useEffect(() => {
		setLoading(false);
		setVisible(false);
	}, []);

	function handleChange(e) {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	}

	function handleSubmit(e) {
		e.preventDefault();
		setLoading(true);
		axios
			.post(
				"https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
				user
			)
			.then(() => {
				navigate("/");
			})
			.catch(() => {
				alert("Erro ao cadastrar. Cheque se seus campos são válidos.");
				setLoading(false);
			});
	}

	return (
		<StyledDiv>
			<img src={logo} alt="logo" />
			<fieldset disabled={loading}>
				<form onSubmit={handleSubmit}>
					<TextInput
						type="email"
						onChange={handleChange}
						value={user.email}
						name="email"
						placeholder="email"
					/>
					<TextInput
						type="password"
						onChange={handleChange}
						value={user.password}
						name="password"
						placeholder="senha"
					/>
					<TextInput
						type="text"
						onChange={handleChange}
						value={user.name}
						name="name"
						placeholder="nome"
					/>
					<TextInput
						type="url"
						onChange={handleChange}
						value={user.image}
						name="image"
						placeholder="foto"
					/>
					<StyledButton
						type="submit"
						width="303px"
						height="45px"
						fontSize="21px"
					>
						{loading ? <Loading /> : "Cadastrar"}
					</StyledButton>
				</form>
			</fieldset>
			<Link to="/">Já tem uma conta? Faça login!</Link>
		</StyledDiv>
	);
}

const StyledDiv = styled.div`
	width: 100%;
	height: 100vh;
	margin: 0 auto;
	display: flex;
	align-items: center;
	flex-direction: column;
	> img {
		margin: 32px 0;
	}
	> fieldset {
		> form {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}
	> a {
		margin-top: 25px;
		color: #52b6ff;
	}
`;
