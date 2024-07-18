module.exports = {
    roots: ['<rootDir>/src'],
    // collectionCoverageFrom: ["<rootDir>/src/**/*.ts"],
    // coverageDirectory: "coverage"
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    // moduleNameMapper: {
    //     '^@/(.*)$': '<rootDir>/src/$1',
    // },
};
