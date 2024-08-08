import { SquareValue } from "../../machines/game-machine/game-machine";

export interface IBoard {
    board: SquareValue[];
    onSquareClick: (index: number) => void;
}