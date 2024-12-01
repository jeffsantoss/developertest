module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        "^@infra/(.*)$": "<rootDir>/src/infra/$1",
        "^@common/(.*)$": "<rootDir>/src/common/$1",
        "^@constants/(.*)$": "<rootDir>/src/constants/$1",
        "^@domain/(.*)$": "<rootDir>/src/domain/$1",
        "^@config/(.*)$": "<rootDir>/src/config/$1",
        "^@application/(.*)$": "<rootDir>/src/application/$1",
    },
};