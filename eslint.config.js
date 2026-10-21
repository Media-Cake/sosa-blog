import js from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

const UNBOUNDED_LOOPS = [
  {
    selector: 'DoWhileStatement',
    message:
      'No do…while: count or fetch first, then loop on a plain condition',
  },
  {
    selector: 'ForStatement[test=null]',
    message: 'No for(;;): every loop needs an explicit termination condition',
  },
  {
    selector: "WhileStatement[test.type='Literal'][test.value=true]",
    message:
      'No while(true): every loop needs an explicit termination condition',
  },
];

export default tseslint.config(
  { ignores: ['dist', 'storybook-static', 'eslint.config.js'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      'no-restricted-syntax': ['error', ...UNBOUNDED_LOOPS],
      'no-nested-ternary': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
    },
  },
  eslintPluginPrettierRecommended,
);
