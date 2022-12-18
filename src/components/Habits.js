import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../contexts/auth";
import Habit from "./Habit";
import LoadingScreen from "./LoadingScreen";
import NewTask from "./NewTask";

export default function Habits() {
	const [selected, setSelected] = useState([]);
	const [habitName, setHabitName] = useState("");
	const [expand, setExpand] = useState(0);
	const [habits, setHabits] = useState(undefined);
	const [loading, setLoading] = useState(false);
	const NoHabits = (
		<p>
			Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
			começar a trackear!
		</p>
	);
	const navigate = useNavigate();
	const {setVisible, config} = useContext(AuthContext);
	useEffect(() => {
		setVisible(true);
		axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
		.then((response) => {
			setHabits(response.data);
		})
		.catch(() => {
			alert("Erro ao requisitar dados do servidor. Por favor logue novamente.");
			navigate("/");
		});
		// eslint-disable-next-line
	},[expand, loading]);

	if(habits === undefined || loading === true) {
		return <LoadingScreen />;
	}
	const habitsNumber = habits.length;

	return (
		<StyledDiv>
			<div>
				<h1>Meus hábitos</h1>
				<button
					data-test="habit-create-btn"
					onClick={() => {
						setExpand(1);
					}}
				>
					+
				</button>
			</div>
			<NewTask
				expand={expand}
				setExpand={setExpand}
				selected={selected}
				setSelected={setSelected}
				habitName={habitName}
				setHabitName={setHabitName}
			/>
			{habitsNumber === 0 && NoHabits}
			{habits.map((habit) => (<Habit key={habit.id} name={habit.name} id={habit.id} days={habit.days} setLoading={setLoading}/>))}
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
