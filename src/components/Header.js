import styled from "styled-components";
import logo from "../assets/header_logo.svg";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function Header() {
	const { userImage, visible, setToken, setUserImage } = useContext(AuthContext);

	const navigate = useNavigate();
	function logout(){
		localStorage.clear();
		setToken("");
		setUserImage("");
		navigate("/");
	}

	return (
		<StyledHeader visible={visible ? 1 : 0} data-test="header">
			<img src={logo} alt="logo" />
			<div>
				<AiOutlineLogout onClick={logout}/>
				<img src={userImage} alt="user" />
			</div>
		</StyledHeader>
	);
}

const StyledHeader = styled.header`
	width: 100%;
	height: 70px;
	background: #126ba5;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 18px;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
	z-index: 1;
	> div {
		display: flex;
		align-items: center;
		> svg {
			color: #fff;
			font-size: 27px;
			margin-right: 18px;
		}
		> img {
			width: 51px;
			height: 51px;
			border-radius: 50%;
		}
	}
`;
