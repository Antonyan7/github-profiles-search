import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  extends: './tsconfig.json',
  compilerOptions: {
    noEmit: true,
    jsx: 'react-jsx',
    types: ['jest', '@testing-library/jest-dom'],
  },
  include: ['**/*.test.ts', '**/*.test.tsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json', // ✅ Tell ts-jest to use the test config
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // if you're using path aliases like @/components
  },
};

export default createJestConfig(customJestConfig);
