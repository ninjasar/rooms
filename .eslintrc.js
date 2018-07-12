module.exports =
{
  // http://eslint.org/docs/rules/
  "extends": [
      "eslint:recommended",
      "google"
     ],

    "parserOptions": {
        "ecmaVersion": 2017,
        "sourceType": "module",
        "ecmaFeatures": {
          "jsx": true,
        }
    },

    "rules": {
        "padded-blocks": 0,
        "no-trailing-spaces": 0,
        "linebreak-style": 0,
        "brace-style": 0,
        "object-curly-spacing": 0,
        "spaced-comment": 0,
        "block-spacing": 0,
        "max-len": [1, 120],
        "no-multi-str": 0,
        "no-console": 0,
        "require-jsdoc": 0,
        "react/jsx-uses-vars": [2]
    },

    "env": {
        "node": true,
        "es6": true,
        "jest": true,
        "browser": true,
    },

    "plugins": [
      "react"
    ],
}
