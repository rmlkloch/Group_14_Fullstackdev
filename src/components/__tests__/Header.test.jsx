import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Header from '../Header';

describe('Header Component', () => {
  it('displays the current user\'s profile information', () => {
    render(<Header activePage="board" onNavigate={vi.fn()} onLogout={vi.fn()} />);
    
    // Verifying profile text renders properly
    expect(screen.getByText('Alex Mercer')).toBeInTheDocument();
    expect(screen.getByText('AM')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign out/i })).toBeInTheDocument();
  });

  it('renders navigation links and handles click events', async () => {
    const mockOnNavigate = vi.fn();
    const user = userEvent.setup();
    
    render(<Header activePage="board" onNavigate={mockOnNavigate} onLogout={vi.fn()} />);
    
    // Using getByRole for links (rendered as buttons in this component)
    const boardLink = screen.getByRole('button', { name: /Board/i });
    const reportsLink = screen.getByRole('button', { name: /Reports/i });
    const settingsLink = screen.getByRole('button', { name: /Settings/i });

    expect(boardLink).toBeInTheDocument();
    expect(reportsLink).toBeInTheDocument();
    expect(settingsLink).toBeInTheDocument();

    // Simulate clicking a navigation link
    await user.click(reportsLink);
    expect(mockOnNavigate).toHaveBeenCalledWith('reports');
    
    await user.click(settingsLink);
    expect(mockOnNavigate).toHaveBeenCalledWith('settings');
  });
});
