module.exports = {
  roots: ['<rootDir>'],
  moduleFileExtensions: [
    'ts',
    'js',
    'json',
  ],
  collectCoverageFrom: [
    '**/src/**/*.{ts,tsx}',
    '!**/__tests__/**',
  ],
  testMatch: ['<rootDir>/tests/**/?(*.)(spec|test).(t)s(x|)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
