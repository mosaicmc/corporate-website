import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    exclude: ['tests/ui/**'],
    include: ['tests/**/*.test.ts'],
  },
});
