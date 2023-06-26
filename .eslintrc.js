module.exports = {
  env: {
    node: true,
    es2022: true,
    browser: true,
  },
  extends: ['standard', 'eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: [
    '_site/**/*',
    'dist/**/*',
    'public/**/*',
    'src/_assets/**/*',
  ],
}
