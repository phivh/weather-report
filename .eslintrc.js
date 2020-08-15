module.exports = {
  parser: "@typescript-eslint/parser",
  settings: {
    react: {
      version: "detect",
    },
  },
  parserOptions: {
    ecmaVersion: 6, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es6: true,
  },
  extends: [],
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'import'],
  rules: {
    // '@typescript-eslint/class-name-casing': 'warn',
    '@typescript-eslint/no-array-constructor': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { args: 'none' }],
    'react/jsx-uses-react': 'warn',
    'react/jsx-uses-vars': 'warn', 
  }
};