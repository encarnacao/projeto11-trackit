import styled from "styled-components";
import { StyledButton, TextInput } from "../styles/GlobalStyles";

export default function NewTask({
	expand,
	setExpand,
	selected,
	setSelected,
	habitName,
	setHabitName,
}) {
    const days = "DSTQQSS".split("");
	function handleSelection(index) {
		if (selected.includes(index)) {
			setSelected(selected.filter((item) => item !== index));
		} else {
			setSelected([...selected, index]);
		}
	}

	return (
		<NewTaskDiv expand={expand}>
			<div>
				<TextInput
					type="text"
					onChange={(e) => {
						setHabitName(e.target.value);
					}}
					value={habitName}
					placeholder="nome do hábito"
				/>
				<div>
					{days.map((day, index) => (
						<DayButton
							key={index}
							selected={selected.includes(index) ? 1 : 0}
							onClick={() => {
								handleSelection(index);
							}}
						>
							{day}
						</DayButton>
					))}
				</div>
			</div>
			<div>
				<button
					onClick={() => {
						setExpand(0);
					}}
				>
					Cancelar
				</button>
				<StyledButton width="84px" height="35px" fontSize="16px">
					Salvar
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
		opacity: ${(props) => (props.expand ? "1" : "0")};
		transition: opacity 1.5s;
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

const DayButton = styled.div`
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
