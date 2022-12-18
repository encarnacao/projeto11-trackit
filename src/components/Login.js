import styled from "styled-components";
import { useEffect, useState } from "react";
import { StyledButton, TextInput } from "../styles/GlobalStyles";
import Loading from "./Loading";
import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ setVisible }) {
	const [login, setLogin] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		setLogin(true);
		setVisible(false);
	});
	return (
		<StyledDiv>
			<img src={logo} alt="logo" />
			<form
				onSubmit={(e) => {
					e.preventDefault();
					navigate("/habitos");
				}}
			>
				<TextInput type="email" placeholder="email" />
				<TextInput type="password" placeholder="senha" />
				<StyledButton
					type="submit"
					width="303px"
					height="45px"
					fontSize="21px"
				>
					{login ? "Entrar" : <Loading />}
				</StyledButton>
			</form>
			<Link to="/cadastro">Não tem uma conta? Cadastre-se!</Link>
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
	> form {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	> a {
		margin-top: 25px;
		color: #52b6ff;
	}
`;
