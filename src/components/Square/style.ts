import styled from "styled-components";

export const StyledButton = styled.button`
  width: 100px;
  height: 100px;
  font-size: 24px;
  cursor: ${props => props.value ? 'default' : 'pointer'};
  background-color: white;
  border: 1px solid;
  border-color: #E2E8F0;
  color: #1A202C;

  &:hover {
    background-color: ${props => props.value ? 'white' : '#EDF2F7'};
  }
  
  &:active {
    background-color: ${props => props.value ? 'white' : '#E2E8F0'};
  }
`;