# ESLint & Prettier Setup Guide

## 개요
코드 품질 관리를 위해 ESLint와 Prettier를 통합 설정

## 설치된 도구

### ESLint 9.39.0
- **목적**: 코드 품질 규칙 강제, 잠재적 버그 감지
- **설정**: `eslint.config.js` (Flat Config 사용)
- **특징**:
  - TypeScript ESLint 플러그인 통합
  - 엄격한 타입 체크
  - 코드 스타일 규칙 적용

### Prettier 3.6.2
- **목적**: 자동 코드 포맷팅
- **설정**: `.prettierrc`
- **특징**:
  - 일관된 코드 스타일
  - 모든 파일에 동일한 형식 적용

## 주요 ESLint 규칙

### TypeScript 관련
- ✅ `no-explicit-any`: 'any' 타입 금지
- ✅ `no-unused-vars`: 미사용 변수 감지 (언더스코어 제외: `_var`)
- ✅ `explicit-module-boundary-types`: 함수 반환 타입 명시 (경고)

### 일반 규칙
- ✅ `no-var`: `var` 사용 금지, `const`/`let` 사용
- ✅ `eqeqeq`: 엄격한 동등 비교 (`===` 필수)
- ✅ `no-console`: 일반 console 금지 (warn, error만 허용)
- ✅ `curly`: 조건문에 중괄호 필수
- ✅ `no-empty`: 빈 블록 금지

### 테스트 파일 제외
`src/**/*.test.ts`, `src/**/*.spec.ts` 파일에서는 `any` 타입 허용

## Prettier 설정

```json
{
  "semi": true,                    // 세미콜론 필수
  "trailingComma": "es5",          // 마지막 쉼표 (배열/객체)
  "singleQuote": true,             // 싱글 쿠트 사용
  "printWidth": 100,               // 한 줄 최대 길이
  "tabWidth": 2,                   // 탭 너비
  "useTabs": false,                // 스페이스 사용
  "arrowParens": "always",         // 화살표 함수 괄호
  "endOfLine": "lf"                // Unix 줄 끝
}
```

## 사용 가능한 npm 스크립트

### 린팅
```bash
# ESLint 체크 (에러만 보고)
pnpm lint

# ESLint 자동 수정
pnpm lint:fix
```

### 포맷팅
```bash
# 코드 포맷팅 실행
pnpm format

# 포맷팅 확인 (수정 없음)
pnpm format:check
```

### 테스트
```bash
# 테스트 실행
pnpm test

# 감시 모드
pnpm test:watch

# 커버리지 리포트
pnpm test:coverage
```

### 통합 명령어
```bash
# 린트 + 포맷 체크 + 테스트 모두 실행
pnpm lint && pnpm format:check && pnpm test

# 전체 자동 수정 및 포맷팅
pnpm lint:fix && pnpm format && pnpm test
```

## 실무 워크플로우

### 1. 개발 중
```bash
# 감시 모드로 테스트 실행
pnpm test:watch
```

### 2. 커밋 전
```bash
# 코드 품질 확인 및 자동 수정
pnpm lint:fix
pnpm format
pnpm test
```

### 3. CI/CD 파이프라인 (자동 확인)
```bash
pnpm lint           # 에러 있으면 실패
pnpm format:check   # 포맷이 잘못되면 실패
pnpm test           # 테스트 실패하면 실패
```

## 통합 테스트: `linting-integration.test.ts`

이 파일은 ESLint와 Prettier 규칙이 제대로 적용되었는지 검증합니다:

### ESLint Rules 테스트
- const/let 사용 (var 금지)
- 엄격한 동등 비교 (===)
- any 타입 금지
- 미사용 변수 감지
- console.warn/error만 허용

### Prettier Formatting 테스트
- 싱글 쿠트 일관성
- 스페이싱 및 들여쓰기
- 세미콜론 자동 추가
- 줄 끝 일관성

### TypeScript Strict Mode 테스트
- 반환 타입 명시
- Null 체크 강제

## 주요 기능 요약

| 기능 | ESLint | Prettier | Jest |
|------|--------|----------|------|
| 코드 품질 | ✅ | ❌ | ❌ |
| 자동 수정 | ✅ | ✅ | ❌ |
| 포맷팅 | ❌ | ✅ | ❌ |
| 테스트 | ❌ | ❌ | ✅ |

## 참고사항

- **ESM 모듈**: `package.json`의 `"type": "module"`로 설정
- **TypeScript 5.9**: 최신 버전의 strict 모드 활성화
- **Pre-commit Hook**: husky 설정은 별도로 추가 가능

## 추가 설정 (선택사항)

### Husky를 이용한 Pre-commit Hook
```bash
pnpm install -D husky
npx husky install
npx husky add .husky/pre-commit "pnpm lint:fix && pnpm format && pnpm test"
```

### VS Code 설정 (`.vscode/settings.json`)
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

## 문제 해결

### ESLint 에러: "Cannot find module"
- `tsconfig.json`의 `project` 경로 확인
- `node_modules` 재설치: `pnpm install`

### Prettier와 ESLint 충돌
- 현재 설정은 호환성 있음
- 충돌 시 `pnpm format` → `pnpm lint:fix` 순서로 실행

### Jest 테스트 실패
- TypeScript 컴파일 에러 확인
- `pnpm test --no-coverage` 로 빠른 테스트