import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.spec.ts"],
  moduleFileExtensions: ["ts", "js", "json"],
  moduleNameMapper: {
    '^@decorators/(.*)$': '<rootDir>/src/decorators/$1',
    '^@dtos/(.*)$': '<rootDir>/src/dtos/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@entities/(.*)$': '<rootDir>/src/database/entities/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '^@middlewares/(.*)$': '<rootDir>/src/middlewares/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@routes/(.*)$': '<rootDir>/src/routes/$1',
    '^@interfaces/(.*)$': '<rootDir>/src/interfaces/$1',
    '^@enums/(.*)$': '<rootDir>/src/enums/$1',
    '^@models/(.*)$': '<rootDir>/src/database/models/$1',
    '^@server/(.*)$': '<rootDir>/src/server/$1',
    '^@migrations/(.*)$': '<rootDir>/src/database/migrations/$1',
  },
};

export default config;
