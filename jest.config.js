module.exports = {
    moduleNameMapper: {
        "@core/(.*)": "<rootDir>/src/app/core/$1"
    },
    preset: "jest-preset-angular",
    setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
    modulePathIgnorePatterns: ["<rootDir>/cypress/", "<rootDir>/server/"],
    reporters: ["default", "jest-junit"],
};
