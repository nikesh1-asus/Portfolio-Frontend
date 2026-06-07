import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Contact from '../components/sections/Contact';

describe('Contact Component Form Validation', () => {
  it('renders contact form with all fields', () => {
    const { asFragment } = render(<Contact />);
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('displays error messages when submitting empty fields', async () => {
    render(<Contact />);
    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    
    fireEvent.click(submitButton);

    expect(await screen.findByText(/Name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Subject is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Message is required/i)).toBeInTheDocument();
  });

  it('displays validation error for invalid email', async () => {
    render(<Contact />);
    
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Nikesh Dev' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText(/Subject/i), { target: { value: 'Project Collaboration' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello, let\'s collaborate on a Next.js project!' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    expect(await screen.findByText(/Invalid email address/i)).toBeInTheDocument();
  });

  it('submits successfully and shows success banner when fields are valid', async () => {
    render(<Contact />);
    
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Nikesh Dev' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'nikesh@example.com' } });
    fireEvent.change(screen.getByLabelText(/Subject/i), { target: { value: 'Project Collaboration' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello, let\'s collaborate on a Next.js project!' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    expect(await screen.findByTestId('success-banner')).toBeInTheDocument();
  });
});
