import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

export default [
  {
    ignores: [
      'coverage/**',
      'dist/**',
      'docs/.vitepress/cache/**',
      'docs/.vitepress/dist/**',
      'docs/node_modules/**',
      'docs/public/**',
      'docs/themes/vue/source/js/**',
      'node_modules/**',
      'output/**'
    ]
  },
  js.configs.recommended,
  ...pluginVue.configs['flat/vue2-essential'],
  {
    files: ['src/**/*.{js,vue}', 'tests/**/*.{js,cjs}', 'docs/demo/**/*.js', '*.config.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.vitest
      }
    },
    rules: {
      'no-console': 'off',
      'no-debugger': 'error',
      'vue/multi-word-component-names': 'off'
    }
  }
]
