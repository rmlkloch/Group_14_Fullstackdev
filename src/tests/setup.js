import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { handlers } from '../mocks/handlers';
import { beforeAll, afterEach, afterAll } from 'vitest';

const localStorageMock = (function () {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = String(value);
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});
Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

export const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));

afterEach(() => {
  server.resetHandlers();
  localStorage.clear();
});

afterAll(() => server.close());

