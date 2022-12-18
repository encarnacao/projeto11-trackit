import styled from "styled-components";
import {IoTrashOutline} from "react-icons/io5";
import { AuthContext } from "../contexts/auth";
import { useContext } from "react";
import axios from "axios";

export default function Habit({name, id, days, setLoading}){
    const weekdays = "DSTQQSS".split("");
    const {config} = useContext(AuthContext);

    function deleteHabit(){
        setLoading(true);
        axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, config)
        .then(()=>{
            setLoading(false);
        })
        .catch(()=>{
            alert("Erro ao deletar hábito. Tente novamente.");
            setLoading(false);
        });
    }

    return (
        <StyledDiv>
            <Trash onClick={deleteHabit}/>
            <h1>{name}</h1>
            <div>
                {weekdays.map((day, index) => (<Day key={index} selected={days.includes(index)}>{day}</Day>))}
            </div>
        </StyledDiv>
    )
}

const StyledDiv = styled.div`
    width: 100%;
    height: 91px;
    position: relative;
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 15px;
    > div {
        display: flex;
    }
    > h1 {
        font-size: 20px;
        color: #666666;
        margin-bottom: 8px;
    }
`;

const Trash = styled(IoTrashOutline)`
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 20px;
    color: #666666;
`;

const Day = styled.div`
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
`;