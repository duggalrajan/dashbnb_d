module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFiles: [
    '<rootDir>/tests/unit/jest.helpers.js',
  ],
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/tests'],
  coverageReporters: ['json', 'lcov', 'clover', 'html'],
}
