# 프로젝트 AI 스킬 가이드

셸 명령 실행이 가능한 환경(Claude Code, Codex CLI 등)에서는 아래 절차를 자동 실행한다.
그렇지 않은 환경(Copilot Chat 등)에서는 단계별 가이드를 제공하고 사용자가 직접 실행하도록 안내한다.

## 1. 커밋 메시지 생성 스킬

커밋 요청 시 다음 절차를 따른다.

1. **분석**: `git diff` 또는 스테이징된 변경 사항을 검토하여 핵심 내용을 파악한다.
2. **규칙 적용**: 아래 타입 중 변경 성격에 맞는 것을 선택한다.
   - `feat`: 새 기능, `fix`: 버그 수정, `refactor`: 리팩토링
   - `style`: 코드 포맷팅, `docs`: 문서, `test`: 테스트, `chore`: 빌드·설정·기타
   - `design`: UI/UX 디자인 변경, `ci`: CI/CD 관련, `perf`: 성능 개선
3. **메시지 구성**:
   - 제목: `type: 메시지 (#이슈번호)` (마침표 금지)
   - 예시: `feat: 로그인 기능 구현 (#123)`
   - 본문(선택): 변경 이유와 내용을 글머리 기호(`-`)로 요약
4. **검증**: 이슈 번호 포함 여부와 마침표 유무를 확인한 후 커밋한다.

## 2. PR 본문 자동 작성 스킬

PR 작성 요청 시 `.github/pull_request_template.md` 템플릿을 기반으로 초안을 생성한다.

1. **템플릿 로드**: `.github/pull_request_template.md`를 먼저 읽는다.
2. **컨텍스트 추출**: `git log develop..HEAD`와 현재 작업 내용을 분석한다.
3. **제목 생성**: `[타입] 한글 내용` 형식으로 작성한다.
   - 타입은 변경 사항의 성격에 가장 적합한 것을 대문자로 선택한다 (`FEAT`, `FIX`, `REFACTOR`, `STYLE`, `DOCS`, `TEST`, `CHORE`, `DESIGN`, `CI`, `PERF`)
   - 예시: `[FEAT] 장바구니 공통 카드 컴포넌트 추가`
4. **내용 매핑**:
   - **ISSUE**: 브랜치명·커밋의 이슈 번호를 기반으로 `close #번호` 기입
   - **What is this PR?**: 비즈니스 로직 중심의 상세 설명 작성
   - **Test Checklist**: 작업 완료 항목을 체크리스트로 구성
   - **Screenshot**: `src/pages/` 또는 `src/shared/components/` 변경 시 이미지 영역 확보
5. **출력**: GitHub에 즉시 붙여넣을 수 있는 마크다운 형태로 제공한다.

## 3. 코드 접근성(A11y) 검사 스킬

컴포넌트 작성 또는 수정 시 다음 항목을 검사한다.

- **Interactive**: 클릭 가능한 요소는 반드시 `<button>` 태그 사용 (div·span 금지)
- **Labels**: 아이콘 버튼은 `aria-label` 필수, `<input>`은 `<label>`과 `id/htmlFor` 연결 확인
- **Media**: `<img>` 태그에 의미 있는 `alt` 속성 부여, 장식용 이미지는 `alt=""` 처리
- **Structure**: 페이지당 `<h1>` 1개 제한 및 시맨틱 태그(`main`, `section`, `nav` 등) 권장
