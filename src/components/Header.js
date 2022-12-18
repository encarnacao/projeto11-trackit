import styled from "styled-components";
import logo from "../assets/header_logo.svg";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";

export default function Header() {
	const { userImage, visible } = useContext(AuthContext);
	return (
		<StyledHeader visible={visible ? 1 : 0}>
			<img src={logo} alt="logo" />
			<img src={userImage} alt="user" />
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
	opacity: ${(props) => props.visible};
	> img:last-child {
		width: 51px;
		height: 51px;
		border-radius: 50%;
	}
`;
