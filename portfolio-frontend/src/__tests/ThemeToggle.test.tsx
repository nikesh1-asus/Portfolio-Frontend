import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../components/Layout';

jest.mock('../components/Layout', () => ({
  useTheme: jest.fn(),
}));

describe('ThemeToggle Component', () => {
  const mockToggleTheme = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders sun icon when theme is dark', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      toggleTheme: mockToggleTheme,
    });

    const { asFragment } = render(<ThemeToggle />);
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders moon icon when theme is light', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    const { asFragment } = render(<ThemeToggle />);
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('calls toggleTheme on click', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
});
