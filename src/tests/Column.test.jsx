import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import Column from '../components/Column';

describe('Member 2 — React Column Component Tests', () => {
  const sampleTasks = [
    {
      id: 'task-1',
      title: 'Design Wireframes',
      description: 'Create Figma mockup for board UI',
      priority: 'High',
      status: 'To do',
      column: 'To do',
      assignee: 'Alice'
    },
    {
      id: 'task-2',
      title: 'Setup Database',
      description: 'Configure MongoDB schema models',
      priority: 'Medium',
      status: 'To do',
      column: 'To do',
      assignee: 'Bob'
    }
  ];

  it('renders column header title and task count badge correctly', () => {
    render(<Column title="In Progress" count={5} tasks={[]} />);

    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders task cards provided in tasks prop', () => {
    render(
      <Column 
        title="To do" 
        count={2} 
        tasks={sampleTasks} 
        columns={['To do', 'Doing', 'Done']}
      />
    );

    expect(screen.getByText('Design Wireframes')).toBeInTheDocument();
    expect(screen.getByText('Setup Database')).toBeInTheDocument();
  });

  it('renders loading skeleton cards when loading prop is true', () => {
    const { container } = render(<Column title="Doing" loading={true} />);

    const skeletonCards = container.querySelectorAll('.skeleton-card');
    expect(skeletonCards.length).toBeGreaterThan(0);
  });

  it('triggers move right callback when move right arrow is clicked on task card', () => {
    const handleUpdateStatus = vi.fn();

    render(
      <Column 
        title="To do" 
        count={1} 
        tasks={[sampleTasks[0]]} 
        columns={['To do', 'Doing', 'Done']}
        onUpdateStatus={handleUpdateStatus}
      />
    );

    const moveRightButtons = screen.getAllByTitle(/move right/i);
    fireEvent.click(moveRightButtons[0]);

    expect(handleUpdateStatus).toHaveBeenCalledWith('task-1', 'Doing');
  });

  it('triggers move left callback when move left arrow is clicked on task card', () => {
    const handleUpdateStatus = vi.fn();
    const doingTask = { ...sampleTasks[0], status: 'Doing', column: 'Doing' };

    render(
      <Column 
        title="Doing" 
        count={1} 
        tasks={[doingTask]} 
        columns={['To do', 'Doing', 'Done']}
        onUpdateStatus={handleUpdateStatus}
      />
    );

    const moveLeftButtons = screen.getAllByTitle(/move left/i);
    fireEvent.click(moveLeftButtons[0]);

    expect(handleUpdateStatus).toHaveBeenCalledWith('task-1', 'To do');
  });

  it('triggers task deletion callback when delete button is clicked', () => {
    const handleDelete = vi.fn();

    render(
      <Column 
        title="To do" 
        tasks={[sampleTasks[0]]} 
        onDelete={handleDelete}
      />
    );

    const deleteButtons = screen.getAllByTitle(/delete task/i);
    fireEvent.click(deleteButtons[0]);

    expect(handleDelete).toHaveBeenCalledWith('task-1');
  });

  it('applies drag-over class and renders drop placeholder visual on dragEnter / dragOver', () => {
    const { container } = render(<Column title="Done" tasks={[]} />);

    const columnElement = container.querySelector('.column-wrapper');
    expect(columnElement).not.toHaveClass('drag-over');

    fireEvent.dragEnter(columnElement, { preventDefault: () => {} });

    expect(columnElement).toHaveClass('drag-over');
    expect(screen.getByText('Drop task here')).toBeInTheDocument();

    fireEvent.dragLeave(columnElement, { preventDefault: () => {} });
    expect(columnElement).not.toHaveClass('drag-over');
  });

  it('handles drop event and invokes status update callback', () => {
    const handleUpdateStatus = vi.fn();
    const { container } = render(
      <Column title="Done" tasks={[]} onUpdateStatus={handleUpdateStatus} />
    );

    const columnElement = container.querySelector('.column-wrapper');

    fireEvent.drop(columnElement, {
      preventDefault: () => {},
      dataTransfer: {
        getData: (type) => (type === 'text/plain' ? 'task-1' : '')
      }
    });

    expect(handleUpdateStatus).toHaveBeenCalledWith('task-1', 'Done');
  });
});
