import { useEffect } from "react";
import styled from "styled-components";

export default function History({ setVisible }) {
	useEffect(() => {
		setVisible(true);
	});
	return (
		<StyledDiv>
			<div>
				<h1>Histórico</h1>
			</div>
			<p>
				Em breve você poderá ver o histórico dos seus hábitos aqui!
			</p>
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
	padding: 30px 20px;
	background-color: #f2f2f2;
	> div {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 25px;
		> h1 {
			font-size: 23px;
			color: #126ba5;
		}
		> button {
			font-size: 27px;
			color: #ffffff;
			background-color: #52b6ff;
			border: none;
			border-radius: 5px;
			width: 40px;
			height: 35px;
		}
	}
	> p {
		font-size: 18px;
		color: #666666;
	}
`;
