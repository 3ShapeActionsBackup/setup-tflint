const babelParser = require('@babel/eslint-parser');
const { fixupPluginRules } = require('@eslint/compat');
const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const _import = require('eslint-plugin-import');
const jest = require('eslint-plugin-jest');
const jsdoc = require('eslint-plugin-jsdoc');
const promise = require('eslint-plugin-promise');
const security = require('eslint-plugin-security');
const globals = require('globals');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = [
  {
    ignores: ['**/dist/'],
  },
  ...compat.extends('eslint:recommended', 'prettier', 'plugin:prettier/recommended'),
  {
    plugins: {
      jsdoc,
      jest,
      promise,
      security,
      import: fixupPluginRules(_import),
    },

    languageOptions: {
      globals: {
        ...globals.node,
      },

      parser: babelParser,
      ecmaVersion: 5,
      sourceType: 'commonjs',

      parserOptions: {
        requireConfigFile: false,
        sourceType: 'script',
      },
    },

    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.ts'],
        },
      },

      jsdoc: {
        preferredTypes: {
          Array: 'Array<object>',
          'Array.': 'Array<object>',
          'Array<>': '[]',
          'Array.<>': '[]',
          'Promise.<>': 'Promise<>',
        },
      },
    },

    rules: {
      'prettier/prettier': [
        'error',
        {},
        {
          usePrettierrc: true,
        },
      ],

      curly: ['error', 'all'],
      'callback-return': ['error', ['callback', 'cb', 'next', 'done']],
      'class-methods-use-this': 'off',
      'consistent-return': 'off',
      'handle-callback-err': ['error', '^.*err'],
      'new-cap': 'off',
      'no-console': 'error',
      'no-else-return': 'error',
      'no-eq-null': 'off',
      'no-global-assign': 'error',
      'no-loop-func': 'off',
      'no-lone-blocks': 'error',
      'no-negated-condition': 'error',
      'no-shadow': 'error',
      'no-template-curly-in-string': 'error',
      'no-undef': 'error',
      'no-underscore-dangle': 'off',
      'no-unsafe-negation': 'error',
      'no-use-before-define': ['error', 'nofunc'],
      'no-useless-rename': 'error',

      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',

          prev: ['directive', 'block', 'block-like', 'multiline-block-like', 'cjs-export', 'cjs-import', 'class', 'export', 'import', 'if'],

          next: '*',
        },
        {
          blankLine: 'never',
          prev: 'directive',
          next: 'directive',
        },
        {
          blankLine: 'any',
          prev: '*',
          next: ['if', 'for', 'cjs-import', 'import'],
        },
        {
          blankLine: 'any',
          prev: ['export', 'import'],
          next: ['export', 'import'],
        },
        {
          blankLine: 'always',
          prev: '*',
          next: ['try', 'function', 'switch'],
        },
        {
          blankLine: 'always',
          prev: 'if',
          next: 'if',
        },
        {
          blankLine: 'never',
          prev: ['return', 'throw'],
          next: '*',
        },
      ],

      'no-new': 'off',
      'no-empty': 'error',
      'no-empty-function': 'error',
      'valid-jsdoc': 'off',
      yoda: 'error',
      'import/extensions': ['error', 'never'],
      'import/no-unresolved': 'off',

      'import/order': [
        'error',
        {
          'newlines-between': 'always',

          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      'jsdoc/check-alignment': 'error',
      'jsdoc/check-indentation': 'off',
      'jsdoc/check-param-names': 'off',
      'jsdoc/check-tag-names': 'error',
      'jsdoc/check-types': 'error',
      'jsdoc/newline-after-description': 'off',
      'jsdoc/no-undefined-types': 'off',
      'jsdoc/require-description': 'off',
      'jsdoc/require-description-complete-sentence': 'off',
      'jsdoc/require-example': 'off',
      'jsdoc/require-hyphen-before-param-description': 'error',
      'jsdoc/require-param': 'error',
      'jsdoc/require-param-description': 'off',
      'jsdoc/require-param-name': 'error',
      'jsdoc/require-param-type': 'error',
      'jsdoc/require-returns-description': 'off',
      'jsdoc/require-returns-type': 'error',
      'jsdoc/valid-types': 'error',
      'promise/always-return': 'error',
      'promise/always-catch': 'off',

      'promise/catch-or-return': [
        'error',
        {
          allowThen: true,
        },
      ],

      'promise/no-native': 'off',
      'promise/param-names': 'error',
      'security/detect-buffer-noassert': 'error',
      'security/detect-child-process': 'error',
      'security/detect-disable-mustache-escape': 'error',
      'security/detect-eval-with-expression': 'error',
      'security/detect-new-buffer': 'error',
      'security/detect-no-csrf-before-method-override': 'error',
      'security/detect-non-literal-fs-filename': 'error',
      'security/detect-non-literal-regexp': 'error',
      'security/detect-non-literal-require': 'off',
      'security/detect-object-injection': 'off',
      'security/detect-possible-timing-attacks': 'error',
      'security/detect-pseudoRandomBytes': 'error',
      'security/detect-unsafe-regex': 'error',
      strict: 'off',
    },
  },
  {
    files: ['**/*.test.js'],

    languageOptions: {
      globals: {
        ...jest.environments.globals.globals,
      },
    },
  },
];
