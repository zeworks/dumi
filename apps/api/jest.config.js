/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: "src",
  testMatch: [
    "<rootDir>/**/*.{test,spec}.ts",
  ]
};
