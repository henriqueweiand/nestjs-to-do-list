module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testTimeout: 20000,
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  testPathIgnorePatterns: [],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/interfaces/**',
    '!**/strategies/**',
    '!**/common/**',
    '!**/mock/**',
    '!**/migrations/**',
    '!**/enum/**',
    '!**/index.ts',
    '!**/server.ts',
    '!**/*.config.ts',
    '!**/*.factory.ts',
    '!**/*.module.ts',
    '!**/*.entity.ts',
    '!**/*.dto.ts',
    '!envs.ts',
    '!<rootDir>/main.ts',
  ],
  preset: 'ts-jest',
};
