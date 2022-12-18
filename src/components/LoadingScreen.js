import styled from "styled-components";
import { TailSpin } from "react-loader-spinner";

export default function LoadingScreen(){
    return(
        <LoadingDiv>
            <TailSpin
                color="#52B6FF"
                height={200}
                width={200}
            />
        </LoadingDiv>
    );
}

const LoadingDiv = styled.div`
    width: 100vw;
    height: 85vh;
    background-color: #f2f2f2;
    display: flex;
    align-items: center;
    justify-content: center;
`;