import { useEffect, useState } from "react";
import styled from "styled-components";
import Habit from "./Habit";
import NewTask from "./NewTask";

const MOCK = [
	{
		id: 1,
		name: "Nome do hábito",
		days: [1, 3, 5],
	},
	{
		id: 2,
		name: "Nome do hábito 2",
		days: [1, 3, 4, 6],
	},
];

export default function Habits({ setVisible }) {
	const [selected, setSelected] = useState([]);
	const [habitName, setHabitName] = useState("");
	const [expand, setExpand] = useState(0);
	const habitsNumber = MOCK.length;
	const NoHabits = (
		<p>
			Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
			começar a trackear!
		</p>
	);
	useEffect(() => {
		setVisible(true);
	});
	return (
		<StyledDiv>
			<div>
				<h1>Meus hábitos</h1>
				<button
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
			{MOCK.map((habit) => (<Habit key={habit.id} name={habit.name} id={habit.id} days={habit.days} />))}
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
