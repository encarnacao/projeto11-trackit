import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { StyledButton, TextInput } from "../styles/GlobalStyles";
import Loading from "./Loading";
import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
	const [loading, setLoading] = useState(false);
	const [user,setUser] = useState({
		email: "",
		password: "",
	});
	const {setToken, setUserImage, setVisible} = useContext(AuthContext);
	const navigate = useNavigate();
	useEffect(() => {
		setVisible(false);
	// eslint-disable-next-line
	}, []);

	function handleChange(e) {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	}

	function handleSubmit(e){
		e.preventDefault();
		setLoading(true);
		axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", user)
		.then((response) => {
			setToken(response.data.token);
			setUserImage(response.data.image);
			navigate("/hoje");
		})
		.catch(() => {
			alert("Email ou senha incorretos");
			setLoading(false);
		});
	}

	return (
		<StyledDiv>
			<img src={logo} alt="logo" />
			<fieldset disabled={loading}>
				<form onSubmit={handleSubmit}>
					<TextInput onChange={handleChange} name="email" value={user.email} type="email" placeholder="email" />
					<TextInput onChange={handleChange} name="password" value={user.password} type="password" placeholder="senha" />
					<StyledButton
						type="submit"
						width="303px"
						height="45px"
						fontSize="21px"
					>
						{loading ? <Loading /> : "Entrar"}
					</StyledButton>
				</form>
			</fieldset>
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
