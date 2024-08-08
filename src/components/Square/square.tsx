import { FC } from "react"
import { ISquare } from "./types"
import { StyledButton } from "./style"

export const Square: FC<ISquare> = ({ value, onClick }) => (
    <StyledButton onClick={onClick} value={value as string}>
        {value}
    </StyledButton>
);
