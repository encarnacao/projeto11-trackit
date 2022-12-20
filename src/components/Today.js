import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../contexts/auth";
import styled from "styled-components";
import Task from "./TodayTask";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import LoadingScreen from "./LoadingScreen";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Today() {
	const [loading, setLoading] = useState(false);
	const today = dayjs().locale("pt-br").format("dddd, DD/MM");
	const { setVisible, todayHabits, setTodayHabits, config } =
		useContext(AuthContext);
	const navigate = useNavigate();
	useEffect(() => {
		setVisible(true);
		axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)
		.then((response) => {
			setTodayHabits(response.data);
		})
		.catch(() => {
			alert("Erro ao requisitar dados do servidor. Por favor logue novamente.");
			navigate("/");
		});
		// eslint-disable-next-line
	}, [loading]);
	
	const noHabits = (
		<p>
			Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
			começar a trackear!
		</p>
	);

	if (todayHabits === undefined) {
		return <LoadingScreen />;
	}

	const done = todayHabits.filter((habit) => habit.done).length;
	const percentage = (done / todayHabits.length) * 100;

	return (
		<StyledDiv>
			<div>
				<h1 data-test="today">{today[0].toUpperCase() + today.slice(1)}</h1>
				{percentage > 0 ? (
					<h2 data-test="today-counter">{percentage.toFixed(0)}% dos hábitos concluídos</h2>
				) : (
					<p data-test="today-counter">Nenhum hábito concluido ainda</p>
				)}
				{todayHabits.length === 0 && noHabits}
				<Tasks>
					{todayHabits.map((habit) => (
						<Task
							key={habit.id}
							id={habit.id}
							habit={habit.name}
							sequence={habit.currentSequence}
							record={habit.highestSequence}
							done={habit.done}
							loading={loading}
							setLoading={setLoading}
						/>
					))}
				</Tasks>
			</div>
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
		margin-bottom: 25px;
		> h1 {
			font-size: 23px;
			color: #126ba5;
			margin-bottom: 10px;
		}
		> h2 {
			font-size: 18px;
			color: #8fc549;
		}
		> p {
			font-size: 18px;
			color: #bababa;
		}
	}
`;

const Tasks = styled.div`
	width: 100%;
	margin-top: 30px;
`;
