import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import Header from '../components/Header';
import ProtectedRoute, { HasRole } from '../components/ProtectedRoute';
import * as AuthContextModule from '../context/AuthContext';

describe('Member 4 — React User Profile & Role Permissions Component Tests', () => {

  describe('Header User Profile Component', () => {
    it('renders Header title, navigation links, and user profile', () => {
      render(
        <Header activePage="board" onNavigate={vi.fn()} onLogout={vi.fn()} />
      );

      expect(screen.getByText('Kanban Flow')).toBeInTheDocument();
      expect(screen.getByText('Alex Mercer')).toBeInTheDocument();
      expect(screen.getByText('Sign Out')).toBeInTheDocument();
    });

    it('triggers onLogout callback when user profile sign out is clicked', () => {
      const handleLogout = vi.fn();
      render(
        <Header activePage="board" onNavigate={vi.fn()} onLogout={handleLogout} />
      );

      const userProfileElement = screen.getByTitle('Click to Sign Out');
      fireEvent.click(userProfileElement);

      expect(handleLogout).toHaveBeenCalledTimes(1);
    });
  });

  describe('ProtectedRoute & Role Authorization Guard', () => {
    it('renders loading state while verifying authentication', () => {
      vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
        isAuthenticated: false,
        loading: true,
        authError: null,
        user: null,
        checkAuth: vi.fn(),
        hasRole: () => false,
      });

      render(
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      );

      expect(screen.getByText('Verifying authentication...')).toBeInTheDocument();
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });

    it('renders Access Denied screen when user lacks required role', () => {
      vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
        isAuthenticated: true,
        loading: false,
        authError: null,
        user: { name: 'Member User', email: 'member@example.com', role: 'member' },
        checkAuth: vi.fn(),
        hasRole: (allowed) => false,
      });

      render(
        <ProtectedRoute allowedRoles="admin">
          <div>Admin Only Panel</div>
        </ProtectedRoute>
      );

      expect(screen.getByText('Access Denied')).toBeInTheDocument();
      expect(screen.getByText(/Logged in as: member@example.com \(member\)/i)).toBeInTheDocument();
      expect(screen.queryByText('Admin Only Panel')).not.toBeInTheDocument();
    });

    it('renders protected children when user is authenticated with permitted role', () => {
      vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
        isAuthenticated: true,
        loading: false,
        authError: null,
        user: { name: 'Admin User', email: 'admin@example.com', role: 'admin' },
        checkAuth: vi.fn(),
        hasRole: () => true,
      });

      render(
        <ProtectedRoute allowedRoles="admin">
          <div>Admin Only Dashboard</div>
        </ProtectedRoute>
      );

      expect(screen.getByText('Admin Only Dashboard')).toBeInTheDocument();
      expect(screen.queryByText('Access Denied')).not.toBeInTheDocument();
    });
  });

  describe('HasRole Conditional UI Component Guard', () => {
    it('renders children if user possesses the required role', () => {
      vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
        isAuthenticated: true,
        loading: false,
        authError: null,
        user: { role: 'admin' },
        checkAuth: vi.fn(),
        hasRole: (requiredRole) => requiredRole === 'admin',
      });

      render(
        <HasRole role="admin">
          <button>Admin Action Button</button>
        </HasRole>
      );

      expect(screen.getByText('Admin Action Button')).toBeInTheDocument();
    });

    it('returns null and hides children if user does not possess required role', () => {
      vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
        isAuthenticated: true,
        loading: false,
        authError: null,
        user: { role: 'member' },
        checkAuth: vi.fn(),
        hasRole: () => false,
      });

      render(
        <HasRole role="admin">
          <button>Admin Action Button</button>
        </HasRole>
      );

      expect(screen.queryByText('Admin Action Button')).not.toBeInTheDocument();
    });
  });
});
