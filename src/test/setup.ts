import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock for matchMedia (used by Ant Design components)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
(globalThis as any).IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock ResizeObserver
(globalThis as any).ResizeObserver = class ResizeObserver {
  constructor(cb: any) {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock for URL.createObjectURL
(globalThis as any).URL.createObjectURL = vi.fn(() => 'mock-url');

// Mock console methods for cleaner test output
(globalThis as any).console = {
  ...console,
  warn: vi.fn(),
  error: vi.fn(),
};