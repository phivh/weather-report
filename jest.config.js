// jest.config.jsconst {defaults} from 'jest-config';
const {defaults} = require('jest-config');
module.exports = {
  rootDir: './src',
  testMatch: ['**/?(*.)+(spec|test).(t|j)s?(x)'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
};
