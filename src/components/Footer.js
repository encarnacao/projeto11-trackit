import styled from "styled-components";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";

export default function Footer() {
	const {visible, todayHabits} = useContext(AuthContext);
	let percentage;
	if(todayHabits === undefined || todayHabits.length === 0){
		percentage = 0;
	} else{
		const done = todayHabits.filter((habit) => habit.done);
		percentage = (done.length / todayHabits.length) * 100;
	}

	const progressbarStyle = {
		text: {
			fill: "#fff",
		},
		background: {
			fill: "#3e98c7",
		},
		trail: {
			stroke: "#3e98c7",
		},
		path: {
			stroke: "#fff",
		},
	};

	return (
		<StyledFooter visible={visible ? 1 : 0} data-test="menu">
			<Link to="/habitos" data-test="habit-link">
				<p>Hábitos</p>
			</Link>
			<Link to="/hoje" data-test="today">
				<CircularProgressbar
					value={percentage}
					text="Hoje"
					background={true}
					backgroundPadding={8}
					styles={progressbarStyle}
				/>
			</Link>
			<Link to="/historico" data-test="history-link">
				<p>Histórico</p>
			</Link>
		</StyledFooter>
	);
}

const StyledFooter = styled.footer`
	width: 100%;
	height: 70px;
	background: #ffffff;
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.05);
	z-index: 1;
	opacity: ${(props) => props.visible};
	padding: 35px;
	p {
		font-size: 18px;
		color: #52b6ff;
	}
	.CircularProgressbar {
		width: 91px;
		height: 91px;
		translate: 0% -30%;
	}
	a {
		text-decoration: none;
	}
`;
