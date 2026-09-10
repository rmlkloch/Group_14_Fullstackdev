import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import ProtectedRoute from '../ProtectedRoute';
import { AuthProvider } from '../../context/AuthContext';

const ProtectedContent = () => <div data-testid="protected-content">Protected Content</div>;
const FallbackComponent = () => <div data-testid="login-page">Login Page</div>;

const renderWithProviders = () => {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/login" element={<FallbackComponent />} />
          <Route path="/protected" element={
            <ProtectedRoute fallbackComponent={FallbackComponent}>
              <ProtectedContent />
            </ProtectedRoute>
          } />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );
};

describe('ProtectedRoute Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('redirects an unauthenticated user (API returns 401 or no token)', async () => {
    renderWithProviders();

    // Since there's no token in localStorage, it will instantly become unauthenticated
    // and should render the fallback component.
    await waitFor(() => {
      expect(screen.getByTestId('login-page')).toBeInTheDocument();
    });
    
    // The protected content should not be present
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  it('renders the protected child components for an authenticated user (API returns 200)', async () => {
    // Set a dummy token in localStorage to bypass the local expiration check
    // and trigger the fetch to /api/auth/me which MSW will intercept
    localStorage.setItem('auth_token', 'valid-token');

    renderWithProviders();

    // Wait for the AuthProvider to resolve loading state and render children
    await waitFor(() => {
      expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    });
    
    // The login page should not be present
    expect(screen.queryByTestId('login-page')).not.toBeInTheDocument();
  });
});
