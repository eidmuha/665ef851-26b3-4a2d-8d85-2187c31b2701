module.exports = {
    "env": {
        "browser": true,
        "jest": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "overrides": [
        {
            "env": {
                "node": true,
                "jest": true,
                "es6": true
            },
            "files": [
                ".eslintrc.{js,cjs}",
                "**/*.spec.js",
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double"],
        "no-console": "warn"
    }
};
