import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';

// Mocking the loginUser function from authenticationApis.js
jest.mock('../../apis/authenticationApis', () => ({
  loginUser: jest.fn(),
}));

test('renders login component', () => {
  render(<Login />);
  // Add more assertions as needed
});

test('submits form with valid credentials and handles successful login', async () => {
  render(<Login />);
  // Fill in email and password fields with valid data
  fireEvent.change(screen.getByPlaceholderText('Enter your Email'), { target: { value: 'valid@email.com' } });
  fireEvent.change(screen.getByPlaceholderText('Enter password'), { target: { value: 'validpassword' } });

  // Mock a successful login response
  const successResponse = { key: 'validToken' };
  loginUser.mockResolvedValue(successResponse);

  // Trigger form submission
  fireEvent.click(screen.getByText('Login'));

  // Wait for the component to handle the login
  await waitFor(() => {
    // Add assertions for successful login redirection or any expected behavior
    expect(localStorage.getItem('login')).toBe(JSON.stringify(successResponse));
  });
});

test('submits form with invalid credentials and handles error', async () => {
  render(<Login />);
  // Fill in email and password fields with invalid data
  fireEvent.change(screen.getByPlaceholderText('Enter your Email'), { target: { value: 'invalid@email.com' } });
  fireEvent.change(screen.getByPlaceholderText('Enter password'), { target: { value: 'invalidpassword' } });

  // Mock an error response
  const errorResponse = { non_field_errors: ['Invalid credentials'] };
  loginUser.mockRejectedValue({ response: { data: errorResponse } });

  // Trigger form submission
  fireEvent.click(screen.getByText('Login'));

  // Wait for the component to handle the error
  await waitFor(() => {
    // Add assertions for displaying error messages
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });
});

test('handles server error during login', async () => {
  render(<Login />);
  // Fill in email and password fields with valid data
  fireEvent.change(screen.getByPlaceholderText('Enter your Email'), { target: { value: 'valid@email.com' } });
  fireEvent.change(screen.getByPlaceholderText('Enter password'), { target: { value: 'validpassword' } });

  // Mock a server error response
  loginUser.mockRejectedValue({ response: { status: 500 } });

  // Trigger form submission
  fireEvent.click(screen.getByText('Login'));

  // Wait for the component to handle the server error
  await waitFor(() => {
    // Add assertions for displaying a generic error message
    expect(screen.getByText('An error occurred during login. Please try again.')).toBeInTheDocument();
  });
});

// Add more tests as needed
