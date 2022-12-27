import { useContext, useEffect, useState } from "react";
import { Calendar } from "react-calendar";
import styled from "styled-components";
import { AuthContext } from "../contexts/auth";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import LoadingScreen from "./LoadingScreen";
import { useNavigate } from "react-router-dom";
import "dayjs/locale/pt-br";
import Toasty from "./Toast";

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
			habits.push(
				<p key={habit.id} className={habit.done ? "done" : "undone"}>
					{habit.name}: {habit.done ? "Feito" : "Não feito"}
				</p>
			);
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
			<Toasty habitsList={habitsList} open={open} setOpen={setOpen} />
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
		.done {
			background-color: #8fc549;
		}
		.undone {
			background-color: #ea5766;
		}
	}
	.tile {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;
