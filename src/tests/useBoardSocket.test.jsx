import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useBoardSocket } from '../hooks/useBoardSocket';

describe('Member 4 — useBoardSocket Real-Time Hook Tests', () => {
  const createMockSocket = () => {
    const handlers = {};
    return {
      connected: true,
      emit: vi.fn(),
      on: vi.fn((event, cb) => {
        handlers[event] = cb;
      }),
      off: vi.fn((event) => {
        delete handlers[event];
      }),
      _trigger: (event, payload) => {
        if (handlers[event]) {
          handlers[event](payload);
        }
      }
    };
  };

  it('joins board room on mount and leaves on unmount', () => {
    const mockSocket = createMockSocket();
    const boardId = 'board-123';

    const { unmount } = renderHook(() => useBoardSocket(mockSocket, boardId));

    expect(mockSocket.emit).toHaveBeenCalledWith('join:board', 'board-123');

    unmount();

    expect(mockSocket.emit).toHaveBeenCalledWith('leave:board', 'board-123');
  });

  it('tracks socket connection and disconnection status', () => {
    const mockSocket = createMockSocket();
    mockSocket.connected = false;

    const { result } = renderHook(() => useBoardSocket(mockSocket, 'default'));

    expect(result.current.isConnected).toBe(false);

    act(() => {
      mockSocket._trigger('connect');
    });

    expect(result.current.isConnected).toBe(true);

    act(() => {
      mockSocket._trigger('disconnect');
    });

    expect(result.current.isConnected).toBe(false);
  });

  it('updates active users list on presence:update event', () => {
    const mockSocket = createMockSocket();

    const { result } = renderHook(() => useBoardSocket(mockSocket, 'board-456'));

    act(() => {
      mockSocket._trigger('presence:update', { userId: 'user-04' });
    });

    expect(result.current.activeUsers).toContain('user-04');
  });
});
