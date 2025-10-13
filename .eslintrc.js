module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    wx: true,
  },
  extends: ['airbnb', 'prettier', 'plugin:@typescript-eslint/recommended', 'plugin:import/typescript'],
  plugins: ['prettier', 'react-hooks', '@typescript-eslint'],
  rules: {
    'no-unused-vars': 0,
    'react/function-component-definition': 0,
    'react/jsx-no-useless-fragment': 0,
    'no-promise-executor-return': 0,
    'default-param-last': 0,
    'arrow-body-style': 0,
    'no-template-curly-in-string': 0,
    'class-methods-use-this': 0,
    'no-await-in-loop': 0,
    'no-unneeded-ternary': 0,
    'no-lonely-if': 0,
    'react/no-danger': 0,
    'import/no-cycle': 0,
    'no-else-return': 0,
    'no-nested-ternary': 0,
    'no-underscore-dangle': 0,
    'array-callback-return': 0,
    'consistent-return': 0,
    'react/no-access-state-in-setstate': 0,
    'jsx-a11y/anchor-is-valid': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/no-this-alias': 0,
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': 0,
    'react-hooks/rules-of-hooks': 'error',
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'no-param-reassign': 0,
    'react/prop-types': 0, // ts 不需要prop-type
    'import/extensions': 0,
    'import/no-dynamic-require': 0,
    'no-use-before-define': 0,
    'react/jsx-uses-react': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-one-expression-per-line': 0,
    '@typescript-eslint/camelcase': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'no-restricted-globals': ['error', 'event'], // 禁用的全局变量
    'jsx-a11y/no-noninteractive-element-interactions': 0, // 非交互性的标签，允许绑定事件
    '@typescript-eslint/no-use-before-define': [
      // 允许function的提升使用
      'error',
      { functions: false, classes: true },
    ],
    'react/jsx-wrap-multilines': 0, // 多行jsx 需要用()包裹
    'react/destructuring-assignment': 0,
    '@typescript-eslint/no-non-null-assertion': 0, // 非空断言
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    'react-hooks/exhaustive-deps': 0, // async 函数在effect内的使用
    'no-bitwise': 0, // 位运算
    'no-prototype-builtins': 0, // Object.prototype.hasOwnProperty.call(foo, "bar");
    'react/react-in-jsx-scope': 0, // react 必须引入
    'react/no-array-index-key': 0, // 数组下标设key
    'no-empty': 0, // 空的大括号
    'default-case': 0, // switch 默认
    '@typescript-eslint/class-name-casing': 0,
    'jsx-a11y/alt-text': 0,
    'global-require': 0,
    '@typescript-eslint/no-var-requires': 0,
    'react/no-unused-prop-types': 0,
    'react/button-has-type': 0,
    'react/require-default-props': 0,
    'prefer-destructuring': 0,
    'no-plusplus': 0,
    camelcase: 0,
    eqeqeq: 0,
    'no-restricted-syntax': 0,
    '@typescript-eslint/no-empty-function': 0,
    radix: 0,
    'no-restricted-properties': 0,
    'no-unused-expressions': 0,
    'no-sequences': 0,
    'no-throw-literal': 0,
    'no-continue': 0,
    'no-shadow': ['error', { allow: ['TobPageType'] }],
    '@typescript-eslint/no-inferrable-types': 0, // 禁用推断类型检查
    '@typescript-eslint/no-implicit-any-catch': 0, // 禁用隐式 any catch 检查
    '@typescript-eslint/no-unused-vars': 0, // 禁用未使用变量检查
    '@typescript-eslint/explicit-module-boundary-types': 0, // 禁用显式模块边界类型检查
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/order': [
      0,
      {
        groups: ['builtin', 'external', 'internal', 'sibling', 'parent', 'index', 'unknown'],
        pathGroups: [
          {
            pattern: 'react*',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'external',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: [],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        warnOnUnassignedImports: false,
      },
    ],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      jsx: true,
    },
  },
}
