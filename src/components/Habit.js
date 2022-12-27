import styled from "styled-components";
import { IoTrashOutline } from "react-icons/io5";
import { AuthContext } from "../contexts/auth";
import { useContext, useState } from "react";
import {RxCross2, RxCheck} from "react-icons/rx";
import axios from "axios";

export default function Habit({ name, id, days, setLoading }) {
	const [deletion, setDeletion] = useState(false);
	const weekdays = "DSTQQSS".split("");
	const { config } = useContext(AuthContext);

	function deleteHabit() {
		setLoading(true);
		axios
			.delete(
				`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,
				config
			)
			.then(() => {
				setLoading(false);
			})
			.catch(() => {
				alert("Erro ao deletar hábito. Tente novamente.");
				setLoading(false);
			});
	}

	return (
		<StyledDiv data-test="habit-container">
			<Trash
				data-test="habit-delete-btn"
				onClick={() => {
					setDeletion(true);
				}}
			/>
			<h1 data-test="habit-name">{name}</h1>
			<div>
				{weekdays.map((day, index) => (
					<Day
						data-test="habit-day"
						key={index}
						selected={days.includes(index)}
					>
						{day}
					</Day>
				))}
			</div>
			<Deletion del={deletion ? 1 : 0}>
				<p>Deletar hábito</p>
				<div>
					<button
						onClick={() => {
							setDeletion(false);
						}}
					>
						<RxCross2 />
					</button>
					<button onClick={deleteHabit}>
						<RxCheck />
					</button>
				</div>
			</Deletion>
		</StyledDiv>
	);
}

const StyledDiv = styled.div`
	width: 100%;
	height: 91px;
	position: relative;
	background-color: #fff;
	border-radius: 5px;
	margin-bottom: 10px;
	padding: 15px;
	> div {
		display: flex;
	}
	> h1 {
		font-size: 20px;
		color: #666666;
		margin-bottom: 8px;
	}
`;

const Trash = styled(IoTrashOutline)`
	position: absolute;
	right: 10px;
	top: 10px;
	font-size: 20px;
	color: #666666;
`;

const Day = styled.div`
	width: 30px;
	height: 30px;
	border-radius: 5px;
	background-color: ${(props) => (props.selected ? "#cfcfcf" : "#ffffff")};
	border: 1px solid #cfcfcf;
	color: ${(props) => (props.selected ? "#ffffff" : "#dbdbdb")};
	font-size: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 5px;
`;

const Deletion = styled.div`
	width: ${(props) => (props.del ? "100%" : "0")};
	padding: ${(props) => (props.del ? "15px" : "0")};
	height: 100%;
	position: absolute;
	background-color: #ea5766;
	border-radius: 5px;
	margin-bottom: 10px;
	top: 0;
	left: 0;
	transition: all 0.5s ease-in-out;
	overflow: hidden;
	align-items: center;
	justify-content: space-between;
	> *{
		transition: all ${(props) => (props.del ? "1s" : "0.5s")} ease-in-out;
		opacity: ${(props) => (props.del ? "1" : "0")};
	}
	> p {
		color: #fff;
		font-size: 24px;
	}
	> div {
		min-width: 150px;
		display: flex;
		justify-content: space-around;
		> button {
			width: 60px;
			height: 60px;
			border-radius: 5px;
			border: none;
			font-size: 16px;
			color: #fff;
			font-weight: 700;
			font-family: "Lexend Deca", sans-serif;
			display: flex;
			justify-content: center;
			align-items: center;
			&:first-child {
				background-color: #fff;
				color: #666666;
				font-size: 40px;
			}
			&:last-child {
				background-color: #fff;
				color: #8fc549;
				font-size: 40px;
			}
		}
	}
`;
