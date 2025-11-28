const config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  setupFilesAfterEnv: ["./jest.setup.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.[tj]sx?$": "ts-jest",
  },
  testMatch: ["**/tests/**/*.test.ts", "**/pages/**/*.test.tsx"],
};
export default config;
