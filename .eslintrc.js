module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential",],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prefer-destructuring": [
      "error",
      {
        VariableDeclarator: {
          array: false,
          object: false,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    "vue/multi-word-component-names": "off",
  },
};
