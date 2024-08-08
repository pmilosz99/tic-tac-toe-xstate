import { SquareValue } from "../../machines/game-machine/game-machine";

export interface ISquare {
    value: SquareValue;
    onClick: () => void;
}