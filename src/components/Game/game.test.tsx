import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import { Game } from './game';

describe('Game component', () => {
    test('renders initial state correctly', () => {
        render(<Game />);
        expect(screen.getByText(/Next player: x/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Reset/i })).toBeInTheDocument();
        const squares = screen.getAllByRole('button', { name: '' });
        expect(squares).toHaveLength(9);
        squares.forEach(square => expect(square).toBeEmptyDOMElement());
    });

    test('handles a player move correctly', () => {
        render(<Game />);
        const squares = screen.getAllByRole('button', { name: '' });
        
        fireEvent.click(squares[0]);
        expect(squares[0]).toHaveTextContent('x');
        expect(screen.getByText(/Next player: o/i)).toBeInTheDocument();
    });

    test('displays the winner correctly', () => {
        render(<Game />);
        const squares = screen.getAllByRole('button', { name: '' });
        
        fireEvent.click(squares[0]); // x
        fireEvent.click(squares[1]); // o
        fireEvent.click(squares[3]); // x
        fireEvent.click(squares[4]); // o
        fireEvent.click(squares[6]); // x wins
        
        expect(screen.getByText(/Winner: x/i)).toBeInTheDocument();
    });

    test('displays a draw correctly', () => {
        render(<Game />);
        const squares = screen.getAllByRole('button', { name: '' });
        
        fireEvent.click(squares[0]); // x
        fireEvent.click(squares[1]); // o
        fireEvent.click(squares[2]); // x
        fireEvent.click(squares[4]); // o
        fireEvent.click(squares[3]); // x
        fireEvent.click(squares[5]); // o
        fireEvent.click(squares[7]); // x
        fireEvent.click(squares[6]); // o
        fireEvent.click(squares[8]); // x
        
        expect(screen.getByText(/Draw!/i)).toBeInTheDocument();
    });

    test('resets the game correctly', () => {
        render(<Game />);
        const squares = screen.getAllByRole('button', { name: '' });
        
        fireEvent.click(squares[0]);
        fireEvent.click(screen.getByRole('button', { name: /Reset/i }));
        
        expect(screen.getByText(/Next player: x/i)).toBeInTheDocument();
        squares.forEach(square => expect(square).toBeEmptyDOMElement());
    });
});