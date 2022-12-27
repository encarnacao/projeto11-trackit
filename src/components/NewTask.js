import axios from "axios";
import { useContext, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../contexts/auth";
import { StyledButton, TextInput } from "../styles/GlobalStyles";
import Loading from "./Loading";

export default function NewTask({
	expand,
	setExpand,
	selected,
	setSelected,
	habitName,
	setHabitName,
}) {
	const [loading, setLoading] = useState(false);
	const {config} = useContext(AuthContext);

    const days = "DSTQQSS".split("");

	function handleSelection(index) {
		if (selected.includes(index)) {
			setSelected(selected.filter((item) => item !== index));
		} else {
			setSelected([...selected, index]);
		}
	}

	function handleSubmit(){
		const body = {
			name: habitName,
			days: selected
		}
		setLoading(true);
		axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", body, config)
		.then(()=>{
			setExpand(0);
			setSelected([]);
			setHabitName("");
			setLoading(false);
		})
		.catch(()=>{
			alert("Erro ao cadastrar hábito. Tente novamente.");
			setLoading(false);
		})
	}

	return (
		<NewTaskDiv data-test="habit-create-container" expand={expand}>
			<div>
				<TextInput
					data-test="habit-name-input"
					type="text"
					onChange={(e) => {
						setHabitName(e.target.value);
					}}
					value={habitName}
					placeholder="nome do hábito"
					disabled={loading}
				/>
				<div>
					{days.map((day, index) => (
						<DayButton
							data-test="habit-day"
							key={index}
							selected={selected.includes(index) ? 1 : 0}
							onClick={() => {
								handleSelection(index);
							}}
							disabled={loading}
						>
							{day}
						</DayButton>
					))}
				</div>
			</div>
			<div>
				<button
					data-test="habit-create-cancel-btn"
					onClick={() => {
						setExpand(0);
					}}
					disabled={loading}
				>
					Cancelar
				</button>
				<StyledButton data-test="habit-create-save-btn" onClick={handleSubmit} width="84px" height="35px" fontSize="16px" disabled={loading}>
					{loading ? <Loading /> : "Salvar"}
				</StyledButton>
			</div>
		</NewTaskDiv>
	);
}
//Eu gosto de fazer coisas animadas. As vezes isso dá mais trabalho do que deveria
const NewTaskDiv = styled.div`
	width: 100%;
	height: ${(props) => (props.expand ? "180px" : "0px")};
	background-color: #ffffff;
	border-radius: 5px;
	padding: ${(props) => (props.expand ? "20px" : "0px")};
	margin-bottom: ${(props) => (props.expand ? "30px" : "0px")};
	opacity: ${(props) => (props.expand ? "1" : "0")};
	transition: all 0.5s;
	> * {
		display: ${(props) => (props.expand ? "flex" : "none")};
	}
	> div:first-child {
		flex-direction: column;
		margin-bottom: 25px;
		> div {
			display: flex;
		}
	}
	> div:last-child {
		justify-content: flex-end;
		align-items: center;
		> button:first-child {
			background-color: transparent;
			border: none;
			color: #52b6ff;
			font-size: 16px;
			font-family: "Lexend Deca", sans-serif;
			&:disabled {
				filter: opacity(0.7);
			}
		}
		> button:last-child {
			margin-left: 20px;
		}
	}
`;

const DayButton = styled.button`
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
    transition: all 0.2s;
`;
