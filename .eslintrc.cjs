module.exports = {
  plugins: [
    'prettier',
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit/eslint-config-ts/recommended',
    '@electron-toolkit/eslint-config-prettier'
  ],
  parserOptions: {
    project: "./tsconfig.web.json",
    ecmaVersion: 2023,
    sourceType: "module"
  },
  env: {
    es6: true,
    es2022: true,
    browser: true,
    node: true
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "react/prop-types": "off"
  },
}
