module.exports = {
    verbose: true,
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
    moduleDirectories: ["node_modules", "src"],
    moduleNameMapper: {
        "\\.(css|less|scss)$": "identity-obj-proxy"
    },
    preset: "jest-expo",
    transform: {
        // '^.+\\.(ts|tsx)?$': 'ts-jest',
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    // collectCoverage: true,
    // collectCoverageFrom: [
    //     "**/*.{js,jsx}",
    //     "!**/coverage/**",
    //     "!**/node_modules/**",
    //     "!**/babel.config.js",
    //     "!**/jest.setup.js"
    // ]
};