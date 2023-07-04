module.exports = {
    transform: {
        "^.+\\.ts$": "ts-jest",
    },
    preset: "ts-jest",
    testRegex: "/src/.*\\.test\\.ts$",
    testPathIgnorePatterns: ["lib/", "node_modules/"],
    moduleFileExtensions: ["ts", "js", "json"],
    testEnvironment: "node",
};
