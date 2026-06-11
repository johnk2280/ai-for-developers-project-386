import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  rootDir: '../../',
  setupFilesAfterEnv: ['<rootDir>/config/jest/jest.setup.ts'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: '<rootDir>/tsconfig.jest.json',
      diagnostics: false,
    }],
  },
  moduleNameMapper: {
    '\\.(css|module\\.css)$': 'identity-obj-proxy',
    '^.+\\.svg$': 'jest-transformer-svg',
    '^@shared/api/api$': '<rootDir>/src/__mocks__/api.ts',
    '^@shared/api/config/apiConfig$': '<rootDir>/src/__mocks__/apiConfig.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@entities/(.*)$': '<rootDir>/src/entities/$1',
    '^@widgets/(.*)$': '<rootDir>/src/widgets/$1',
  },
  testMatch: ['<rootDir>/src/**/*(*.)@(spec|test).[tj]s?(x)'],
};

export default config;
