import { useMachine } from "@xstate/react";
import { Board } from "../Board";
import gameMachine, { EVENT, STATE } from "../../machines/game-machine/game-machine";
import { GameContainer, GameStatus, GameWrapper, ResetButton } from "./style";

export const Game = () => {
    const [state, send] = useMachine(gameMachine);
    const { board, player, winner } = state.context;

    const handleSquareClick = (index: number): void => {
        send({ type: EVENT.PLAY, index });
    };

    const handleReset = (): void => {
        send({ type: EVENT.RESET });
    };

    return (
        <GameContainer>
            <GameWrapper>
                <GameStatus>
                    {state.matches(STATE.WON) && `Winner: ${winner}`}
                    {state.matches(STATE.DRAW) && 'Draw!'}
                    {state.matches(STATE.PLAYING) && `Next player: ${player}`}
                </GameStatus>
                <Board board={board} onSquareClick={handleSquareClick} />
                <ResetButton onClick={handleReset}>Reset</ResetButton>
            </GameWrapper>
        </GameContainer>
    );
};
