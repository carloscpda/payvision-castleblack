module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  modulePathIgnorePatterns: ["<rootDir>/cache/"],
  globalSetup: "<rootDir>/jest.setup.ts",
};
