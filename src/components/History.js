import { useContext, useEffect, useState } from "react";
import { Calendar } from "react-calendar";
import styled from "styled-components";
import { AuthContext } from "../contexts/auth";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import LoadingScreen from "./LoadingScreen";
import { useNavigate } from "react-router-dom";
import * as Toast from "@radix-ui/react-toast";
import "dayjs/locale/pt-br";

export default function History() {
	const [history, setHistory] = useState([]);
	const [loading, setLoading] = useState(true);
	const [open, setOpen] = useState(false);
	const [habitsList, setHabitsList] = useState([]);
	const { setVisible, config, updateHabits } = useContext(AuthContext);
	const done = [];
	const undone = [];

	const navigate = useNavigate();
	useEffect(() => {
		updateHabits();
		axios
			.get(
				"https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily",
				config
			)
			.then((response) => {
				setHistory(response.data);
				setLoading(false);
			})
			.catch(() => {
				alert("Houve um erro ao obter o histórico. Tente novamente.");
				navigate("/");
			});

		setVisible(true);
		// eslint-disable-next-line
	}, []);

	if (loading) {
		return <LoadingScreen />;
	}

	const dates = history.map((item) => item.day);
	history.forEach((item) => {
		const numberDone = item.habits.filter((habit) => habit.done).length;
		if (numberDone === item.habits.length) {
			done.push(item.day);
		} else {
			undone.push(item.day);
		}
	});

	function listHabits(day) {
		const habits = [];
		day.habits.forEach((habit) => {
			habits.push(`${habit.name}: ${habit.done ? "Feito" : "Não feito"}`);
		});
		return habits;
	}

	function showHistory(date) {
		date = date.toLocaleDateString("pt-BR");
		if (dates.includes(date)) {
			const day = history.find((item) => item.day === date);
			setHabitsList(listHabits(day));
			setOpen(true);
		} else {
			console.log("Nada neste dia");
		}
	}

	function formatDay(date) {
		const formattedDate = date.toLocaleDateString("pt-BR");
		const day = formattedDate.split("/")[0];
		if (done.includes(formattedDate)) {
			return <div className="tile done">{day}</div>;
		} else if (undone.includes(formattedDate)) {
			return <div className="tile undone">{day}</div>;
		}
		return <div className="tile">{day}</div>;
	}

	return (
		<StyledDiv>
			<Toast.Provider>
				<div>
					<h1>Histórico</h1>
				</div>
				<div data-test="calendar">
					<Calendar
						calendarType="US"
						onClickDay={(value) => {
							setOpen(false);
							setTimeout(showHistory, 100, value);
						}}
						formatDay={(l, date) => {
							return formatDay(date);
						}}
					/>
				</div>
				<Toast.Root
					className="toast-root"
					open={open}
					onOpenChange={setOpen}
				>
					<Toast.Title className="toast-title">
						Hábitos do dia
					</Toast.Title>
					<Toast.Description asChild>
						<div className="toast-description">
							{habitsList.map((habit, i) => (
								<p key={i}>{habit}</p>
							))}
						</div>
					</Toast.Description>
					<Toast.Action asChild altText="Close">
						<div className="toast-action">
							<button>X</button>
						</div>
					</Toast.Action>
				</Toast.Root>
				<Toast.Viewport className="toast-viewport" />
			</Toast.Provider>
		</StyledDiv>
	);
}

const StyledDiv = styled.div`
	width: 100%;
	height: calc(100vh - 140px);
	overflow-y: scroll;
	margin: 0 auto;
	display: flex;
	align-items: center;
	flex-direction: column;
	padding: 30px 20px;
	background-color: #f2f2f2;
	> div:first-child {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 25px;
		> h1 {
			font-size: 23px;
			color: #126ba5;
		}
	}
	.react-calendar {
		width: 100%;
		border-radius: 10px;
		padding: 10px;
		border: none;
	}
	.react-calendar__tile {
		height: 60px;
		font-size: 15px;
		padding: 0px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.tile {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.done {
		background-color: #8fc549;
	}
	.undone {
		background-color: #ea5766;
	}

	.toast-viewport {
		position: fixed;
		right: 50px;
		left: 50px;
		top: 50px;
		z-index: 99999;
	}
	.toast-root {
		background-color: white;
		border-radius: 6px;
		box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
			hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
		padding: 15px;
		display: grid;
		grid-template-columns: 1fr 2fr 1fr;
		.toast-title {
			grid-column-start: 2;
			grid-row-start: 1;
			font-size: 18px;
			margin-bottom: 10px;
		}
		.toast-description {
			grid-column-start: 1;
			grid-column-end: 4;
			grid-row-start: 2;
			> p {
				font-size: 14px;
				color: #666666;
			}
		}
		.toast-action {
			grid-column-start: 3;
			grid-row-start: 1;
			position: relative;
			> button {
				background-color: transparent;
				border: 1px dashed #52b6ff;
				border-radius: 5px;
				width: 25px;
				height: 25px;
				color: #52b6ff;
				font-size: 15px;
				font-weight: bold;
				position: absolute;
				top: -10px;
				right: -10px;
			}
		}
	}
	.toast-root[data-state="open"] {
		animation: slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1);
	}
	.toast-root[data-state="closed"] {
		animation: hide 100ms ease-in;
	}
	.toast-root[data-swipe="move"] {
		transform: translateX(var(--radix-toast-swipe-move-x));
	}
	.toast-root[data-swipe="cancel"] {
		transform: translateX(0);
		transition: transform 200ms ease-out;
	}
	.toast-root[data-swipe="end"] {
		animation: swipeOut 100ms ease-out;
	}

	@keyframes hide {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	@keyframes slideIn {
		from {
			transform: translateX(-10%);
		}
		to {
			transform: translateX(0);
		}
	}

	@keyframes swipeOut {
		from {
			transform: translateX(var(--radix-toast-swipe-end-x));
		}
		to {
			transform: translateX(calc(100% + var(--viewport-padding)));
		}
	}
`;
