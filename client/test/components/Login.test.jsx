import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../src/Login';
import axios from 'axios';

// Add testing-library/jest-dom matchers
import '@testing-library/jest-dom';

// Mock axios
vi.mock('axios', () => ({
  default: {
    post: vi.fn()
  }
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form correctly', () => {
    render(
      <BrowserRouter>
        <Login onLogin={() => {}} />
      </BrowserRouter>
    );
    
    // Updated to match actual text in the component
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument();
  });

  it('handles login success', async () => {
    // Mock successful login response
    axios.post.mockResolvedValueOnce({ 
      data: { message: 'Login success', username: 'testuser', nim: '123456' }
    });
    
    const onLoginMock = vi.fn();
    
    render(
      <BrowserRouter>
        <Login onLogin={onLoginMock} />
      </BrowserRouter>
    );
    
    // Fill in form and submit
    fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('Log In'));
    
    // Wait for the async action to complete
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:3001/login',
        { username: 'testuser', password: 'password' }
      );
      expect(onLoginMock).toHaveBeenCalledWith('testuser', '123456');
      expect(mockNavigate).toHaveBeenCalledWith('/checkdatamahasiswa');
    });
  });

  it('handles login failure', async () => {
    // Mock failed login response
    axios.post.mockResolvedValueOnce({ 
      data: { message: 'Login failed' }
    });
    
    render(
      <BrowserRouter>
        <Login onLogin={vi.fn()} />
      </BrowserRouter>
    );
    
    // Fill in form and submit
    fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByText('Log In'));
    
    // Check for error message
    const errorElement = await screen.findByText(/Incorrect username or password/i);
    expect(errorElement).toBeInTheDocument();
  });

  it('handles network errors', async () => {
    // Mock network error
    axios.post.mockRejectedValueOnce(new Error('Network Error'));
    
    render(
      <BrowserRouter>
        <Login onLogin={vi.fn()} />
      </BrowserRouter>
    );
    
    // Fill in form and submit
    fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('Log In'));
    
    // Updated to match the actual error message in the component
    const errorElement = await screen.findByText(/An error occurred. Please try again./i);
    expect(errorElement).toBeInTheDocument();
  });
});