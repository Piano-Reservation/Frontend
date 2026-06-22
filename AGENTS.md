# AGENTS.md

이 문서는 이 저장소에서 작업하는 AI 에이전트가 반드시 따라야 하는 프로젝트 컨벤션입니다.

## 커밋 컨벤션

커밋 메시지는 다음 형식을 사용합니다.

```text
type: 메시지 (#이슈번호)
```

예시:

```text
feat: 로그인 기능 구현 (#123)
```

사용 가능한 타입은 다음과 같습니다.

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

## 브랜치 컨벤션

브랜치명은 다음 형식을 사용합니다.

```text
type/설명-이슈번호
```

예시:

```text
feat/login-12
```

사용 가능한 타입은 다음과 같습니다.

| 타입 | 설명 |
| --- | --- |
| `feat` | 새로운 기능 |
| `fix` | 버그 수정 |
| `refactor` | 리팩토링 |
| `design` | UI/UX 디자인 변경 |
| `chore` | 빌드, 설정 등 기타 |
| `docs` | 문서 작업 |
| `ci` | CI/CD 관련 변경 |

## 네이밍 컨벤션

### 폴더 / 파일

| 대상 | 규칙 | 예시 |
| --- | --- | --- |
| 폴더명 | `kebab-case` | `navigation-bar`, `server-actions` |
| 일반 파일 (`.ts`) | `camelCase` | `calculate.ts`, `apiClient.ts` |
| 컴포넌트 파일 (`.tsx`) | `PascalCase` | `Button.tsx`, `ProductList.tsx` |

### 변수 / 함수 / 상수

| 대상 | 규칙 | 예시 |
| --- | --- | --- |
| 변수명 | `camelCase` | `userName`, `itemCount` |
| 함수명 | `camelCase` | `fetchProducts()`, `handleSubmit()` |
| 상수명 | `UPPER_SNAKE_CASE` | `MAX_COUNT`, `API_URL` |

### 컴포넌트

| 대상 | 규칙 | 예시 |
| --- | --- | --- |
| 컴포넌트명 | `PascalCase` | `Layout`, `LoginForm` |
| 페이지 컴포넌트 | `PascalCase + Page` | `MainPage`, `CartPage` |

## Export 규칙

### 컴포넌트

컴포넌트는 파일 하단에서 `default export`를 사용합니다.

```tsx
const ProductList = () => {
  return <div>상품 리스트</div>;
};

export default ProductList;
```

### 유틸 함수

유틸 함수는 각 함수를 `named export`로 내보냅니다.

```tsx
export const fetchItems = () => {
  /* ... */
};

export const updateUser = () => {
  /* ... */
};
```
