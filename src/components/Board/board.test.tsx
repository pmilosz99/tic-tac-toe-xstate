import '@testing-library/jest-dom'
import { fireEvent, render, screen } from "@testing-library/react"
import { Board } from './board'
import { IBoard } from './types';

describe('Board component', () => {
    const mockOnSquareClick = jest.fn();
    const defaultProps: IBoard = {
        board: ['x', 'o', 'x', 'o', 'x', 'o', 'x', 'o', 'x'],
        onSquareClick: mockOnSquareClick,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the correct number of Square components', () => {
        render(<Board {...defaultProps} />);
        const squareElements = screen.getAllByRole('button');
        expect(squareElements).toHaveLength(defaultProps.board.length);
    });

    test('passes the correct value to each Square component', () => {
        render(<Board {...defaultProps} />);
        const squareElements = screen.getAllByRole('button');
        squareElements.forEach((button, index) => {
            expect(button).toHaveTextContent(defaultProps.board[index] as string);
        });
    });

    test('calls onSquareClick with the correct index when a Square is clicked', () => {
        render(<Board {...defaultProps} />);
        const squareElements = screen.getAllByRole('button');
        squareElements.forEach((button, index) => {
            fireEvent.click(button);
            expect(mockOnSquareClick).toHaveBeenCalledWith(index);
        });
        expect(mockOnSquareClick).toHaveBeenCalledTimes(defaultProps.board.length);
    });
});