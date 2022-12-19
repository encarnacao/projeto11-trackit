import { useContext, useEffect, useState } from "react";
import { Calendar } from "react-calendar";
import styled from "styled-components";
import { AuthContext } from "../contexts/auth";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import LoadingScreen from "./LoadingScreen";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

export default function History() {
	const [history, setHistory] = useState([]);
	const [loading, setLoading] = useState(true);
	const { setVisible, config } = useContext(AuthContext);
	const today = dayjs().locale("pt-br").format("DD/MM/YYYY");
	console.log(today);
	const done = [];
	const undone = [];

	const navigate = useNavigate();
	useEffect(() => {
		axios
			.get(
				"https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily",
				config
			)
			.then((response) => {
				setHistory(response.data);
				setLoading(false);
				console.log(response.data);
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

	function listHabits(day){
		let habits = '';
		day.habits.forEach((habit) => {
			habits += `${habit.name}: ${habit.done ? 'Feito' : 'Não feito'}\n`;
		})
		return habits;
	}

	function showHistory(date){
		date = date.toLocaleDateString("pt-BR");
		if(dates.includes(date)){
			const day = history.find((item) => item.day === date);
			alert(listHabits(day));
		} else{
			console.log("Nada neste dia");
		}
	}	

	function formatDay(date){
		const formattedDate = date.toLocaleDateString("pt-BR");
		const day = formattedDate.split("/")[0];
		console.log(date);
		if (done.includes(formattedDate)){
			return <div className="tile done">{day}</div>
		} else if(undone.includes(formattedDate)){
			return <div className="tile undone">{day}</div>
		}
		return <div className="tile">{day}</div>
	}

	return (
		<StyledDiv>
			<div>
				<h1>Histórico</h1>
			</div>
			<Calendar
				data-test="calendar"
				calendarType="US"
				onClickDay={(value) => {showHistory(value)}}
				formatDay={(l,date) => {return formatDay(date)}}
			/>
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
	.tile{
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
`;
