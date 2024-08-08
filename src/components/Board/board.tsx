import { FC } from "react";
import { Square } from "../Square";
import { BoardWrapper } from "./style";
import { IBoard } from "./types";

export const Board: FC<IBoard> = ({ board, onSquareClick }) => (
    <BoardWrapper>
        {board.map((value, index) => (
            <Square key={index} value={value} onClick={() => onSquareClick(index)} />
        ))}
    </BoardWrapper>
);
