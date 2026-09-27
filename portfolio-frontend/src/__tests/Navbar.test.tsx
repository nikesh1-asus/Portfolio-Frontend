import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../components/Navbar';

// Mock useTheme since Navbar renders ThemeToggle which uses it
jest.mock('../components/Layout', () => ({
  useTheme: () => ({
    theme: 'dark',
    toggleTheme: jest.fn(),
  }),
}));

describe('Navbar Component', () => {
  it('renders navbar brand logo and links', () => {
    const { asFragment } = render(<Navbar />);
    expect(screen.getByText('Nikesh')).toBeInTheDocument();
    
    // Check main navigation links exist in desktop view
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('toggles mobile menu drawer on hamburger click', () => {
    render(<Navbar />);
    
    // Hamburger button
    const toggleButton = screen.getByTestId('hamburger-btn');
    expect(toggleButton).toBeInTheDocument();
    
    // Click button to open menu
    fireEvent.click(toggleButton);
    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
    
    // Click button again to close
    fireEvent.click(toggleButton);
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
  });
});
