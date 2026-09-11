import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskCard from '../TaskCard';

describe('Member 3 - TaskCard Component Tests', () => {
  const mockTask = {
    _id: '123',
    title: 'Complete M4 Unit Tests',
    priority: 'high',
    status: 'in-progress'
  };

  it('renders task title and details correctly', () => {
    render(<TaskCard task={mockTask} />);
    
    expect(screen.getByText('Complete M4 Unit Tests')).toBeInTheDocument();
  });

  it('triggers edit callback when clicked', async () => {
    const onEditMock = jest.fn();
    render(<TaskCard task={mockTask} onEdit={onEditMock} />);

    const card = screen.getByText('Complete M4 Unit Tests');
    await userEvent.click(card);

    expect(onEditMock).toHaveBeenCalledTimes(1);
  });
});