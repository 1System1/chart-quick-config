module.exports = {
  root: true,
  env: {
      node: true,
  },
  extends: ['plugin:vue/vue3-recommended', '@vue/prettier'],
  parser: 'vue-eslint-parser',

  parserOptions: {
      sourceType: 'module',
      // Use babel-eslint for JavaScript
      parser: 'babel-eslint',
      ecmaVersion: 2020,
      ecmaFeatures: {
          jsx: true,
      },
  },
  rules: {
      //'no-undef': 2,
      indent: ['off', 2],
      semi: ['warn', 'always'], // 行末分号（启用）
      'space-before-function-paren': 0, // 函数名后的空格（禁用）
      'vue/script-indent': ['error', 4, { baseIndent: 1 }], // 缩进规范（两个空格，一倍缩进）
      'vue/attribute-hyphenation': 0, // 忽略属性连字
      'vue/v-on-event-hyphenation': 0, // 忽略属性连字
      'no-console': 'off',
      'no-debugger': 'off',
      'no-unused-vars': 'off', //变量是否使用的规则校验
      'vue/no-v-html': 'off',
      'prettier/prettier': 0, //关闭警告
      // 'vue/html-self-closing': [
      //     'error',
      //     {
      //         html: {
      //             void: 'any',
      //             normal: 'any',
      //             component: 'always',
      //         },
      //         svg: 'always',
      //         math: 'always',
      //     },
      // ],
      // 多字组件名称
      'vue/multi-word-component-names': 'off',
      'vue/first-attribute-linebreak': 'off',
      'vue/no-reserved-props': 'off',
      // Vue.js风格指南(https://cn.vuejs.org/v2/style-guide/)
      // Vue组件排序
      'vue/order-in-components': [
          'warn',
          {
              order: [
                  'el',
                  'name',
                  'key',
                  'parent',
                  'functional',
                  ['delimiters', 'comments'],
                  ['components', 'directives', 'filters'],
                  'extends',
                  'mixins',
                  ['provide', 'inject'],
                  'ROUTER_GUARDS',
                  'layout',
                  'middleware',
                  'validate',
                  'scrollToTop',
                  'transition',
                  'loading',
                  'inheritAttrs',
                  'model',
                  ['props', 'propsData'],
                  'emits',
                  'setup',
                  'fetch',
                  'asyncData',
                  'data',
                  'head',
                  'computed',
                  'watch',
                  'watchQuery',
                  'LIFECYCLE_HOOKS',
                  'methods',
                  ['template', 'render'],
                  'renderError',
              ],
          },
      ],
      // Vue属性排序
      'vue/attributes-order': [
          'warn',
          {
              order: [
                  'DEFINITION',
                  'LIST_RENDERING',
                  'CONDITIONALS',
                  'RENDER_MODIFIERS',
                  'GLOBAL',
                  'UNIQUE',
                  'TWO_WAY_BINDING',
                  'OTHER_DIRECTIVES',
                  'OTHER_ATTR',
                  'EVENTS',
                  'CONTENT',
              ],
              alphabetical: false, //字母顺序
          },
      ],
  },
  overrides: [
      {
          files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)', '*.vue'],
          env: {
              jest: true,
          },
          rules: {
              indent: 'off',
          },
      },
  ],
};
