import styled from "styled-components";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";

export default function Footer({ visible, percentage }) {
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
		<StyledFooter visible={visible ? 1 : 0}>
			<Link to="/habitos">
				<p>Hábitos</p>
			</Link>
			<Link to="/hoje">
				<CircularProgressbar
					value={percentage}
					text="Hoje"
					background={true}
					backgroundPadding={8}
					styles={progressbarStyle}
				/>
			</Link>
			<Link to="/historico">
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
