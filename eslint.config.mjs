// eslint.config.mjs
import globals from 'globals';
import tseslint from 'typescript-eslint'; // typescript-eslint의 메인 모듈
import { FlatCompat } from '@eslint/eslintrc'; // next/core-web-vitals 가져오기 위해 필요
import path from 'path';
import { fileURLToPath } from 'url';

// --- 플러그인 임포트 ---
// tseslint.plugin은 typescript-eslint 모듈에서 직접 가져옴
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
// import tailwindcssPlugin from 'eslint-plugin-tailwindcss';
// import tanstackQueryPlugin from '@tanstack/eslint-plugin-query'; // React Query 사용 시

// --- 설정 임포트 ---
import eslintConfigPrettier from 'eslint-config-prettier'; // Prettier 충돌 방지

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// FlatCompat: next/core-web-vitals 같이 기존 .eslintrc 형식의 설정을 Flat Config에서 사용하기 위함
const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

export default tseslint.config(
  // --- 1. 기본 및 전역 설정 ---
  {
    ignores: [
      'node_modules/',
      '.next/',
      'out/',
      'public/build/',
      '.prettierrc.js', // .prettierrc.js 파일 무시
      '*.config.js', // 설정 파일들 무시
      '*.config.mjs', // 설정 파일들 무시
      // 필요한 경우 빌드 결과물이나 자동 생성 파일 추가
    ],
    languageOptions: {
      globals: {
        // 전역 변수 설정
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        React: 'readonly', // Next.js 17+ 자동 import되지만 명시
      },
      parser: tseslint.parser, // TypeScript 파서 지정 (@typescript-eslint/parser)
      parserOptions: {
        project: path.resolve(__dirname, './tsconfig.eslint.json'), // ESLint용 tsconfig 경로
        tsconfigRootDir: __dirname,
        ecmaFeatures: { jsx: true }, // JSX 사용 설정
      },
    },
    plugins: {
      // 사용할 플러그인 등록
      '@typescript-eslint': tseslint.plugin, // TypeScript 플러그인
      import: importPlugin,
      'jsx-a11y': jsxA11yPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      // tailwindcss: tailwindcssPlugin,
      // '@tanstack/query': tanstackQueryPlugin, // React Query 사용 시
    },
    settings: {
      // 플러그인별 추가 설정
      react: {
        version: 'detect', // React 버전 자동 감지
      },
      'import/resolver': {
        // import 경로 해결 설정
        typescript: {
          project: path.resolve(__dirname, './tsconfig.eslint.json'),
        },
        node: true,
      },
      // tailwindcss: {
      // config: 'tailwind.config.js',
      // },
    },
  },

  // --- 2. ESLint 공식 추천 규칙 ---
  tseslint.configs.recommended,

  // --- 3. TypeScript ESLint 플러그인 추천 규칙 ---
  ...tseslint.configs.recommendedTypeChecked,

  // --- 4. React 플러그인 추천 규칙 ---
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/jsx-no-undef': 'error',
      'react/no-children-prop': 'error',
      'react/no-danger': 'error',
      'react/no-deprecated': 'error',
      'react/no-direct-mutation-state': 'error',
      'react/no-find-dom-node': 'error',
      'react/no-is-mounted': 'error',
      'react/no-render-return-value': 'error',
      'react/no-string-refs': 'error',
      'react/no-unknown-property': 'error',
      'react/require-render-return': 'error',
      'react/self-closing-comp': 'error',
    },
  },

  // --- 5. React Hooks 플러그인 추천 규칙 ---
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  // --- 6. JSX Accessibility 플러그인 추천 규칙 ---
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-role': 'error',
      'jsx-a11y/role-has-required-aria-props': 'error',
      'jsx-a11y/role-supports-aria-props': 'error',
    },
  },

  // --- 7. Next.js 코어 웹 바이탈 규칙 ---
  // `eslint-config-next/core-web-vitals`를 FlatCompat으로 가져옴
  // 이 설정은 React, Hooks, JSX-A11y, Next.js 특화 규칙 등을 포함하며,
  // 위에서 직접 추가한 플러그인 추천 설정과 일부 중복될 수 있습니다.
  // 일반적으로 나중에 선언된 규칙이 우선하므로, Next.js 최적화 설정을 유지합니다.
  ...compat.extends('next/core-web-vitals'),

  // --- 8. 사용자 정의 컨벤션 규칙 (가장 높은 우선순위) ---
  // 이전에 논의된 네이밍, 주석, import 순서 등을 여기에 정의하여
  // 위에서 적용한 추천 규칙들을 덮어쓰거나 보완합니다.
  {
    rules: {
      // === 네이밍 컨벤션 ===
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allowSingleOrDouble',
          trailingUnderscore: 'allowSingleOrDouble',
        },
        { selector: 'function', format: ['camelCase', 'PascalCase'] },
        {
          selector: 'parameter',
          format: ['camelCase'],
          leadingUnderscore: 'allowSingleOrDouble',
        },
        { selector: 'typeLike', format: ['PascalCase'] },
        { selector: 'enumMember', format: ['PascalCase', 'UPPER_CASE'] },
      ],

      // === 주석 ===
      'no-warning-comments': [
        'warn',
        { terms: ['todo', 'fixme'], location: 'start' },
      ],

      // === Import 순서 (eslint-plugin-import 필요) ===
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            { pattern: 'react', group: 'external', position: 'before' },
            { pattern: 'next/**', group: 'external', position: 'before' },
            { pattern: '@/**', group: 'internal', position: 'before' },
            { pattern: '@/app/**', group: 'internal', position: 'before' },
            // ... (기타 프로젝트 경로 그룹)
          ],
          pathGroupsExcludedImportTypes: ['react', 'type'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-unresolved': [
        'error',
        { commonjs: true, caseSensitive: true, ignore: ['^@/'] },
      ], // 경로 별칭(@/) 무시
      'import/prefer-default-export': 'off', // 팀 컨벤션에 따라
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/*.test.{ts,tsx,js,jsx}',
            '**/*.spec.{ts,tsx,js,jsx}',
            'eslint.config.mjs',
            'prettier.config.js', // 또는 .ts
            // 기타 개발용 파일 패턴
          ],
        },
      ],
      'import/extensions': [
        // TypeScript 환경에서는 확장자 불필요
        'error',
        'ignorePackages',
        { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' },
      ],

      // === React 및 Next.js 관련 조정 (플러그인 추천 설정 위에 덮어쓰기) ===
      'react/react-in-jsx-scope': 'off', // jsxRuntime config로 이미 처리
      // "react/jsx-props-no-spreading": "off", // 필요에 따라 활성화/비활성화
      'react/prop-types': 'off', // TypeScript 사용
      'react/require-default-props': 'off', // TypeScript에서 선택적 props 처리
      'react/function-component-definition': [
        'warn',
        {
          namedComponents: ['function-declaration', 'arrow-function'],
          unnamedComponents: 'arrow-function',
        },
      ],
      'jsx-a11y/anchor-is-valid': 'off', // Next/link 사용 시 충돌 방지

      // === 상태 관리 (Zustand - 컨벤션에 따라 사용 지양) ===
      // ESLint로 강제 불가

      // === 데이터 페칭 (React Query - 사용 시) ===
      // '@tanstack/query/exhaustive-deps': 'warn',
      // '@tanstack/query/no-rest-destructuring': 'warn',
      // '@tanstack/query/stable-query-client': 'error',

      // === 기타 필요한 규칙 추가 또는 기본 규칙 비활성화 ===
      'no-console':
        process.env.NODE_ENV === 'production'
          ? ['warn', { allow: ['warn', 'error'] }]
          : 'off',
      // "no-unused-vars": "off", // @typescript-eslint/no-unused-vars 사용 권장
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // === Tailwind CSS ===
      // 'tailwindcss/classnames-order': 'warn',
      // 'tailwindcss/no-custom-classname': 'warn',
      // 'tailwindcss/no-contradicting-classname': 'error',
    },
  },

  // --- 9. 특정 파일 타입에 대한 규칙 (예: 설정 파일, 선택적) ---
  {
    files: ['*.js', '*.cjs', '*.mjs', '*.ts'],
    ignores: ['eslint.config.mjs'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },

  // --- 10. Prettier와의 충돌 방지 (반드시 가장 마지막에 위치) ---
  eslintConfigPrettier
);
