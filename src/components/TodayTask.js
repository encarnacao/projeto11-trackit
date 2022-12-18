import axios from "axios";
import { useContext } from "react";
import styled from "styled-components";
import check from "../assets/check.png";
import { AuthContext } from "../contexts/auth";
import Loading from "./Loading";

export default function Task({ id, habit, sequence, record, done, loading, setLoading}) {
	const highestSequence = sequence === record;
	const { config } = useContext(AuthContext);

	function handleCheck() {
		setLoading(true);
		axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,{}, config)
			.then(() => {
				setLoading(false);
			})
			.catch(() => {
				alert("Erro ao marcar hábito. Tente novamente.");
				setLoading(false);
			});
	}

	function handleUncheck(){
		setLoading(true);
		axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`,{}, config)
			.then(() => {
				setLoading(false);
			})
			.catch(() => {
				alert("Erro ao desmarcar hábito. Tente novamente.");
				setLoading(false);
			});
	}

	return (
		<StyledDiv sequence={highestSequence ? 1 : 0}>
			<div>
				<h1>{habit}</h1>
				<p>
					Sequência atual:{" "}
					<span className={done ? "green" : ""}>
						{sequence} dias{" "}
					</span>
				</p>
				<p>
					Seu record:{" "}
					<span className={highestSequence && done? "green" : ""}>
						{record} dias
					</span>
				</p>
			</div>
			<button onClick={done?handleUncheck:handleCheck} className={done ? "done" : ""}>
				{loading?<Loading />:<img src={check} alt="checkmark" />}
			</button>
		</StyledDiv>
	);
}

const StyledDiv = styled.div`
	width: 100%;
	height: 94px;
	background-color: #fff;
	border-radius: 5px;
	margin-bottom: 10px;
	padding: 13px 15px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	> div {
		> h1 {
			font-size: 20px;
			color: #666666;
			margin-bottom: 8px;
		}
		> p {
			font-size: 13px;
			color: #666666;
			.green {
				color: #8fc549;
			}
		}
	}
	> button {
		width: 69px;
		height: 69px;
		background-color: #e7e7e7;
		border-radius: 5px;
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
	}
	> button.done {
		background-color: #8fc549;
	}
`;
