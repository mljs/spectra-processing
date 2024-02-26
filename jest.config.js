module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/fixtures/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
