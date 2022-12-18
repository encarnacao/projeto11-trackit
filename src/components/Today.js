import { useEffect } from "react";
import styled from "styled-components";
import Task from "./TodayTask";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

const MOCK = [
	{
		id: 3,
		name: "Acordar",
		done: false,
		currentSequence: 1,
		highestSequence: 1,
	},
	{
		id: 4,
		name: "Estudar",
		done: false,
		currentSequence: 5,
		highestSequence: 5,
	},
	{
		id: 5,
		name: "Exercicio",
		done: false,
		currentSequence: 1,
		highestSequence: 3,
	},
];

export default function Today({ setVisible }) {
	const today = dayjs().locale("pt-br").format("dddd, DD/MM");
	console.log(today);
	useEffect(() => {
		setVisible(true);
	});
	const done = MOCK.filter((habit) => habit.done).length;
	const percentage = (done / MOCK.length) * 100;

	const noHabits = (
		<p>
			Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
			começar a trackear!
		</p>
	);

	return (
		<StyledDiv>
			<div>
				<h1>{today[0].toUpperCase() + today.slice(1)}</h1>
				{percentage > 0 ? (
					<h2>{percentage.toFixed(0)}% dos hábitos concluídos</h2>
				) : (
					<p>Nenhum hábito concluido ainda</p>
				)}
				{MOCK.length === 0 && noHabits}
				<Tasks>
					{MOCK.map((habit) => (
						<Task
                            key={habit.id}
							habit={habit.name}
							sequence={habit.currentSequence}
							record={habit.highestSequence}
							done={habit.done}
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
