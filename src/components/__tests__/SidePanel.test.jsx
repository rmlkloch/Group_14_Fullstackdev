import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import SidePanel from '../SidePanel';

describe('SidePanel Component', () => {
  it('renders the team members and buttons correctly', () => {
    render(<SidePanel onSelectDate={vi.fn()} />);
    
    // Check if the toggle button is present
    expect(screen.getByRole('button', { name: /Toggle panel/i })).toBeInTheDocument();
    
    // Verify default members are rendered
    expect(screen.getByText('Alex Mercer')).toBeInTheDocument();
    expect(screen.getByText('Security')).toBeInTheDocument();
    
    // Verify history/calendar toggle button
    expect(screen.getByRole('button', { name: /Member History/i })).toBeInTheDocument();
  });

  it('simulates a user clicking the Member History button to reveal the calendar filter', async () => {
    const user = userEvent.setup();
    render(<SidePanel onSelectDate={vi.fn()} />);
    
    const historyButton = screen.getByRole('button', { name: /Member History/i });
    
    // The calendar filter should not be in the document initially
    expect(screen.queryByText(/Filter History by Date/i)).not.toBeInTheDocument();
    
    // Simulate user interaction
    await user.click(historyButton);
    
    // Now the filter label should be visible
    expect(screen.getByText(/Filter History by Date/i)).toBeInTheDocument();
  });
});
