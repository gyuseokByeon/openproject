module.exports = {
    "extends": [
        "airbnb-base",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript"
    ],
    "env": {
        "browser": true
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "./src/tsconfig.app.json",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/dot-notation": "off",
        "@typescript-eslint/member-delimiter-style": [
            "error",
            {
                "multiline": {
                    "delimiter": "none",
                    "requireLast": true
                },
                "singleline": {
                    "delimiter": "semi",
                    "requireLast": false
                }
            }
        ],
        "@typescript-eslint/naming-convention": "error",
        "@typescript-eslint/no-empty-function": "error",
        "@typescript-eslint/no-use-before-define": "error",
        // note you must disable the base rule as it can report incorrect errors
        "semi": "off",
        "@typescript-eslint/semi": ["error"],
        "brace-style": [
            "error",
            "1tbs"
        ],
        "curly": "error",
        "eol-last": "off",
        "eqeqeq": [
            "error",
            "smart"
        ],
        "guard-for-in": "error",
        "id-blacklist": "off",
        "id-match": "off",
        "max-len": [
            "off",
            {
                "code": 140
            }
        ],
        "no-bitwise": "off",
        "no-caller": "error",
        "no-console": [
            "error",
            {
                "allow": [
                    "log",
                    "warn",
                    "dir",
                    "timeLog",
                    "assert",
                    "clear",
                    "count",
                    "countReset",
                    "group",
                    "groupEnd",
                    "table",
                    "dirxml",
                    "error",
                    "groupCollapsed",
                    "Console",
                    "profile",
                    "profileEnd",
                    "timeStamp",
                    "context"
                ]
            }
        ],
        "no-debugger": "error",
        "no-empty": "error",
        "no-eval": "error",
        "no-new-wrappers": "error",
        "no-redeclare": "error",
        "no-trailing-spaces": "error",
        "no-underscore-dangle": "off",
        "no-unused-labels": "error",
        "no-var": "off",
        "radix": "off",
        // Disable required spaces in license comments
        "spaced-comment": "off",

        // Disable preference on quotes, rely on formatter instead
        "quotes": "off",

        // Whitespace configuration
        "@typescript-eslint/type-annotation-spacing": [
            "error",
            {
                before: false,
                after: false
            }
        ],

        "object-curly-spacing": ["error", "never", {
            "objectsInObjects": true,
            "arraysInObjects": true
        }],

        "indent": ["error", 2]
    }
};
