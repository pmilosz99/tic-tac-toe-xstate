import '@testing-library/jest-dom'
import { fireEvent, render, screen } from "@testing-library/react"
import { Square } from './square'
import { ISquare } from './types';

describe('Square component', () => {
    const mockOnClick = jest.fn();
    const defaultProps: ISquare = {
        value: 'x',
        onClick: mockOnClick,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the Square component with the correct value', () => {
        render(<Square {...defaultProps} />);
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toHaveTextContent('x');
    });

    test('calls onClick when the button is clicked', () => {
        render(<Square {...defaultProps} />);
        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement);
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
});
