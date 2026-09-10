import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
// Note: Assuming Dashboard component exists in src/components or src/pages.
// Adjust the import path if Dashboard is located elsewhere.
import Dashboard from '../Dashboard'; 

describe('Dashboard Component', () => {
  it('displays loading state initially', () => {
    render(<Dashboard />);
    // Verify loading state using getByText or getByRole
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('fetches and displays board data using mock MSW handlers', async () => {
    render(<Dashboard />);
    
    // The MSW handler for GET /api/boards returns [{ id: 1, title: 'Board 1' }]
    await waitFor(() => {
      // Ensure we query from the user's perspective
      expect(screen.getByText('Board 1')).toBeInTheDocument();
    });
  });
});
