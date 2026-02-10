import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'react/no-unescaped-entities': 'off',
      '@next/next/no-img-element': 'off',
      'jsx-a11y/alt-text': 'error',
      'react/no-deprecated': 'error',
    },
  },
  globalIgnores([
    'node_modules/**',
    '.next/**',
    'dist/**',
    'public/**',
    'build/**',
    '.env',
  ]),
])

export default eslintConfig