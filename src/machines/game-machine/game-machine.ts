import { createMachine, assign } from 'xstate';

const MACHINE_ID = 'gameMachine';

export enum STATE {
  PLAYING = 'playing',
  WON = 'won',
  DRAW = 'draw',
}

export enum EVENT {
  PLAY = 'PLAY',
  RESET = 'RESET',
}

type PlayerValue = 'x' | 'o';

export type SquareValue = PlayerValue | null;

export type TGameEvent = { type: EVENT.PLAY; index: number } | { type: EVENT.RESET };

const initialContext = {
  board: Array(9).fill(null) as SquareValue[],
  player: 'x' as PlayerValue,
  winner: undefined as PlayerValue | undefined
};

export const gameMachine = createMachine(
  {
    id: MACHINE_ID,
    initial: STATE.PLAYING,
    types: {} as {
      context: typeof initialContext;
      events: TGameEvent;
    },
    context: initialContext,
    states: {
      [STATE.PLAYING]: {
        always: [
          { target: STATE.WON, guard: 'checkWin', actions: 'setWinner' },
          { target: STATE.DRAW, guard: 'checkDraw' }
        ],
        on: {
          [EVENT.PLAY]: 
            {
              target: STATE.PLAYING,
              guard: 'isValidMove',
              actions: 'updateBoard'
            },
        }
      },
      [STATE.WON]: {},
      [STATE.DRAW]: {},
    },
    on: {
      [EVENT.RESET]: {
        target: `.${STATE.PLAYING}`,
        actions: 'resetGame'
      }
    }
  },
  {
    actions: {
      updateBoard: assign({
        board: ({ context, event }) => {
          if (event.type !== EVENT.PLAY) return context.board;
    
          const updatedBoard = [...context.board];
          updatedBoard[event.index] = context.player;

          return updatedBoard;
        },
        player: ({ context }) => context.player === 'x' ? 'o' : 'x'
      }),
      resetGame: assign(initialContext),
      setWinner: assign({
        winner: ({ context }) => context.player === 'x' ? 'o' : 'x'
      })
    },
    guards: {
      checkWin: ({ context: { board } }) => {
        const winningLines = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8], 
          [0, 3, 6], [1, 4, 7], [2, 5, 8], 
          [0, 4, 8], [2, 4, 6]
        ];

        return winningLines.some(line => 
          line.every(index => board[index] === 'x') || 
          line.every(index => board[index] === 'o')
        );
      },
      checkDraw: ({ context: { board } }) =>  board.every((item) => item),
      isValidMove: ({ context: { board }, event }) => {
        if (event.type !== EVENT.PLAY) return false

        return board[event.index] === null;
      }
    }
  }
);

export default gameMachine;