// Import any polyfills or global setup needed for tests
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

// Add jest-dom matchers to Vitest's expect
expect.extend(matchers);

// Clean up after each test
afterEach(() => {
  cleanup();
});