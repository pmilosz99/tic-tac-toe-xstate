import { createActor } from 'xstate';
import { gameMachine, STATE, EVENT } from './game-machine';

describe('Game machine', () => {
    test('initial state should be playing with an empty board and player x', () => {
        const actor = createActor(gameMachine).start();
        const { value, context } = actor.getSnapshot();
      
        expect(value).toBe(STATE.PLAYING);
        expect(context.board).toEqual(Array(9).fill(null));
        expect(context.player).toBe('x');
      });
      
    test('player x should be able to make a valid move', () => {
        const actor = createActor(gameMachine).start();
    
        actor.send({ type: EVENT.PLAY, index: 0 });
    
        const { context } = actor.getSnapshot();
        expect(context.board[0]).toBe('x');
        expect(context.player).toBe('o'); // After 'x', it's 'o' turn
    });
      
    test('should detect a winning condition for player x', () => {
        const actor = createActor(gameMachine).start();
    
        // Simulate moves leading to a win for 'x'
        actor.send({ type: EVENT.PLAY, index: 0 }); // 'x'
        actor.send({ type: EVENT.PLAY, index: 1 }); // 'o'
        actor.send({ type: EVENT.PLAY, index: 3 }); // 'x'
        actor.send({ type: EVENT.PLAY, index: 2 }); // 'o'
        actor.send({ type: EVENT.PLAY, index: 6 }); // 'x' wins
    
        const { value, context } = actor.getSnapshot();
        expect(value).toBe(STATE.WON);
        expect(context.winner).toBe('x');
    });
      
    test('should detect a draw', () => {
        const actor = createActor(gameMachine).start();
    
        // Simulate moves leading to a draw
        actor.send({ type: EVENT.PLAY, index: 0 }); // 'x'
        actor.send({ type: EVENT.PLAY, index: 1 }); // 'o'
        actor.send({ type: EVENT.PLAY, index: 2 }); // 'x'
        actor.send({ type: EVENT.PLAY, index: 4 }); // 'o'
        actor.send({ type: EVENT.PLAY, index: 3 }); // 'x'
        actor.send({ type: EVENT.PLAY, index: 5 }); // 'o'
        actor.send({ type: EVENT.PLAY, index: 7 }); // 'x'
        actor.send({ type: EVENT.PLAY, index: 6 }); // 'o'
        actor.send({ type: EVENT.PLAY, index: 8 }); // 'x'
    
        const { value } = actor.getSnapshot();
        expect(value).toBe(STATE.DRAW);
    });
    
    test('should reset the game correctly', () => {
        const actor = createActor(gameMachine).start();
    
        // Make a move
        actor.send({ type: EVENT.PLAY, index: 0 });
        // Reset the game
        actor.send({ type: EVENT.RESET });
    
        const { value, context } = actor.getSnapshot();
        expect(value).toBe(STATE.PLAYING);
        expect(context.board).toEqual(Array(9).fill(null));
        expect(context.player).toBe('x');
    });
});
