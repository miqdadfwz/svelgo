module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.+(ts|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  testPathIgnorePatterns: ['./node_modules/'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|sass)$': '<rootDir>/src/__mocks__/styles.mock.js',
  },
  transform: {
    '^.+\\.svelte$': [
      'svelte-jester',
      {
        preprocess: true,
      },
    ],
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'ts', 'svelte'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{svelte,ts,js}', '!<rootDir>/src/**/*.d.ts'],
  coveragePathIgnorePatterns: ['node_modules', 'd.ts'],
};
