import styled from "styled-components";
import { useEffect, useState } from "react";
import { StyledButton, TextInput } from "../styles/GlobalStyles";
import Loading from "./Loading";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

export default function SignIn({ setVisible }) {
	const [signIn, setSignIn] = useState(false);
	useEffect(() => {
		setSignIn(true);
		setVisible(false);
	});
	return (
		<StyledDiv>
			<img src={logo} alt="logo" />
			<form>
				<TextInput type="email" placeholder="email" />
				<TextInput type="password" placeholder="senha" />
				<TextInput type="text" placeholder="nome" />
				<TextInput type="url" placeholder="foto" />
				<StyledButton
					type="submit"
					width="303px"
					height="45px"
					fontSize="21px"
				>
					{signIn ? "Cadastrar" : <Loading />}
				</StyledButton>
			</form>
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
