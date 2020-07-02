const TEST_REGEX = "(/__tests__/.*(test|spec))\\.(jsx?|js?|tsx?|ts?)$";

module.exports = {
  setupFiles: [],
  testRegex: TEST_REGEX,
  transform: {
    "^.+\\.js?$": "ts-jest",
    "^.+\\.ts?$": "ts-jest",
  },
  "testEnvironment": "node",
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "yml"],
  collectCoverage: false,
  "transformIgnorePatterns": [
  ],
};
