module.exports = {
    root: true,
    env: {
        node: true,
    },
    plugins: ["brace-rules"],
    extends: ["plugin:vue/essential", "@vue/prettier", "@vue/typescript"],
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "prettier/prettier": "error",

        // "brace-style": ["error", "stroustrup"],
        "brace-rules/brace-on-same-line": ["error", "stroustrup", { FunctionDeclaration: "ignore" }],
    },
    parserOptions: {
        parser: "@typescript-eslint/parser",
    },
    overrides: [
        {
            files: ["**/__tests__/*.{j,t}s?(x)"],
            env: {
                mocha: true,
            },
        },
    ],
};
