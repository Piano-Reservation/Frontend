# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # 개발 서버 실행
pnpm build        # TypeScript 검사 후 프로덕션 빌드
pnpm lint         # ESLint 검사
pnpm lint:fix     # ESLint 자동 수정
pnpm format       # Prettier 포맷
pnpm format:check # Prettier 검사
pnpm build:icons  # SVG → TSX 아이콘 컴포넌트 자동 생성
```

## 📖 Reference Guides

작업 수행 시 반드시 아래 스킬 가이드를 참조하여 실행한다.

- **AI Action Skills**: `./skills.md` (커밋, PR 생성, A11y 검사 로직 포함)

## Architecture

### 핵심 원칙

- **경로 별칭 (Absolute Imports)**: 모든 임포트는 절대 경로 별칭(`@/`)을 사용한다. 상대 경로(`../`, `./`) 사용을 지양한다. (tsconfig, vite 설정 완료)
  - 예시: `import { Button } from '@/shared/components/Button'`

### 폴더 구조

- `src/app/`: 진입점, 라우터(`router.tsx`), Provider 설정.
- `src/pages/{feature}/`: 페이지 단위 기능. 내부에 전용 `api/`, `components/`, `hooks/` 배치.
- `src/shared/`: 공통 컴포넌트, 유틸, 상수, 전역 상태, 타입 등.
- `src/shared/icons/`: 자동 생성 폴더 (수동 수정 금지).

### 핵심 기술 스택

- **Routing**: React Router v7 (`createBrowserRouter`, `lazy` 로딩 필수).
- **Server State**: TanStack Query v5 (`staleTime: 1m`, `gcTime: 5m`).
- **Styling**: Tailwind CSS v4, `cn()` 유틸리티 사용.
- **Layout**: 모바일 뷰 고정 (min: 375px, max: 430px).

## 🎨 Coding Conventions

### 네이밍 규칙

- **폴더명**: `kebab-case` (예: `navigation-bar`, `server-actions`)
- **일반 파일 (.ts)**: `camelCase` (예: `calculate.ts`, `apiClient.ts`)
- **컴포넌트 파일 (.tsx)**: `PascalCase` (예: `Button.tsx`, `ProductList.tsx`)
- **변수/함수명**: `camelCase` (예: `userName`, `fetchProducts()`)
- **상수명**: `UPPER_SNAKE_CASE` (예: `MAX_COUNT`, `API_URL`)
- **컴포넌트명**: `PascalCase` (예: `Layout`, `LoginForm`)
- **페이지 컴포넌트**: `PascalCase + Page` (예: `MainPage`, `CartPage`)
- **함수명**: 동사+명사 (get, create, handle...), 불린은 `is/has` 접두사

### Export 규칙

- **컴포넌트**: 하단에 `default export`

```tsx
const ProductList = () => {
  return <div>상품 리스트</div>;
};

export default ProductList;
```

- **유틸 함수**: 각 함수를 `named export`

```tsx
export const fetchItems = () => { /* ... */ };
export const updateUser = () => { /* ... */ };
```

### 기타

- **React**: 화살표 함수 선언, Self-closing 태그 준수
- **TypeScript**: `any` 금지 (대신 `unknown`), Props는 `interface` 또는 `type` (접미사 `Props` 사용)

## 🔗 Git 및 워크플로우

### 커밋 컨벤션

형식: `type: 메시지 (#이슈번호)`  
예시: `feat: 로그인 기능 구현 (#123)`

| 타입 | 설명 |
| --- | --- |
| `feat` | 새로운 기능 |
| `fix` | 버그 수정 |
| `docs` | 문서 변경 |
| `style` | 코드 포맷팅 (로직 변경 없음) |
| `refactor` | 리팩토링 |
| `test` | 테스트 추가/수정 |
| `chore` | 빌드, 설정 등 기타 |
| `design` | UI/UX 디자인 변경 |
| `ci` | CI/CD 관련 변경 |
| `perf` | 성능 개선 |

### 브랜치 컨벤션

형식: `type/설명-이슈번호`  
예시: `feat/login-12`

| 타입 | 설명 |
| --- | --- |
| `feat` | 새로운 기능 |
| `fix` | 버그 수정 |
| `refactor` | 리팩토링 |
| `design` | UI/UX 디자인 변경 |
| `chore` | 빌드, 설정 등 기타 |
| `docs` | 문서 작업 |
| `ci` | CI/CD 관련 변경 |

- **Environment**: `.env` 내 `VITE_API_BASE_URL` 참조
