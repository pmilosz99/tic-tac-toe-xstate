import styled from "styled-components";

export const GameContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
`;

export const GameStatus = styled.div`
  margin: 10px;
  color: #1A202C;
  font-size: 24px;
`;

export const ResetButton = styled.button`
  font-size: 16px;
  margin: 10px;
  width: 300px;
  cursor: pointer;
  border: 1px solid;
  border-color: #E2E8F0;
  background-color: white;
  color: #1A202C;
  padding: 10px;

  &:hover {
    background-color: #EDF2F7;
  }
  
  &:active {
    background-color: #E2E8F0;
  }
`;