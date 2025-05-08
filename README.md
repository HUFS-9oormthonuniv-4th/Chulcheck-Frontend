## 개발에 앞서 코드 스타일 및 컨벤션, 구조 지정

### 1. 코딩 스타일 및 컨벤션

- **린터 & 포맷터:**
    - `ESLint` + `Prettier` 사용
    - **설정:**
        - ESLint: Next.js 기본 설정 (`eslint-config-next`) 사용 + 필요한 규칙 추가
        - Prettier: Prettier 기본 설정 사용
    - **강제:** Git `pre-commit` hook 설정 (`husky` + `lint-staged`)하여 커밋 전 자동 검사/수정
- **네이밍 컨벤션:**
    - **파일/폴더:** `kebab-case` (예: `user-profile.tsx`, `utils/`)
    - **컴포넌트:** `PascalCase` (예: `UserProfileCard`)
    - **변수/함수:** `camelCase` (예: `getUserData`, `isLoading`)
    - **상수:** `UPPER_SNAKE_CASE` (예: `MAX_RETRIES`)
    - **타입/인터페이스 (TS):** `PascalCase` (예: `UserData`, `IProduct`)
- **주석:**
    - **필수:** 복잡한 로직, 임시 해결책 (`// TODO:`, `// FIXME:`), 다른 개발자가 이해하기 어려운 부분
    - **지양:** 너무 당연하거나 코드를 그대로 설명하는 주석

---

### 2. 기술 스택 및 라이브러리

- **UI:** `Tailwind CSS`
- **상태 관리:** `Zustand` - 해당 상태관리는 기본적으로 사용을 지양하고, 필요시에만 사용
    - 현재 프로젝트 사이즈로 봐서는 안쓸 확률이 높음
- **데이터 페칭:** `React Query (TanStack Query)`, `Fetch`
- **폼 관리:** `React Hook Form`
- **유틸리티:** 필요시 `date-fns` (날짜), `clsx` 또는 `classnames` (클래스명 조합) 정도만 최소한으로 도입.

---

### 3. 프로젝트 구조 (App Router 기반)

- **기본 구조:** **Feature-Based** 구조
    
    기본적으로 Feature 기반으로 폴더 구분
    
    이후 공통, 내부적으로만 사용되는 독립을 기준으로 컴포넌트, 훅 폴더 구분
    
    ```
    ├── app/                  # App Router
    │   ├── (routes)/         # 라우트 그룹 (선택적)
    │   │   └── [feature-name]/ # 특정 기능 폴더 (예: auth, posts)
    │   │       ├── components/     # 해당 기능 전용 컴포넌트
    │   │       ├── hooks/          # 해당 기능 전용 훅
    │   │       ├── page.tsx        # 페이지
    │   │       └── layout.tsx      # 레이아웃 (필요시)
    │   ├── api/              # API 라우트
    │   ├── globals.css
    │   ├── layout.tsx        # 루트 레이아웃
    │   └── page.tsx          # 루트 페이지
    ├── components/           # 공통 컴포넌트
    │   ├── ui/               # 버튼, 인풋 등 범용 UI 요소
    │   └── layout/           # 헤더, 푸터 등 전역 레이아웃 컴포넌트
    ├── lib/ or shared/       # 공통 로직, 유틸리티, 타입, 상수, API 클라이언트 등
    ├── hooks/                # 공통 커스텀 훅
    ├── public/
    ├── next.config.js
    └── package.json
    
    ```
    
- **컴포넌트 분리:** 재사용 가능한 범용 컴포넌트(`components/`)와 특정 기능 컴포넌트(`app/.../components/`) 명확히 구분.

---

### 4. Git 및 협업 워크플로우

- **브랜치 전략:** `GitHub Flow`
    - `main` 브랜치는 항상 배포 가능한 상태 유지.
    - 모든 작업(기능, 버그 수정)은 `feature/` 또는 `fix/` 등 브랜치에서 진행 (`main`에서 분기).
    - 작업 완료 후 `main`으로 Pull Request(PR) 생성.

- **커밋 메시지:** `Conventional Commits` 사용 권장
    - 형식: `<type>(<scope>): <subject>` (예: `feat(auth): add login functionality`)

- **Pull Request (PR):**
    - **템플릿:** 간단하게라도 사용 (변경 내용 요약, 관련 이슈 번호)
    - **리뷰:** 최소 1명 이상 리뷰 권장 (코드 품질 향상, 지식 공유)
    - **CI:** 자동화된 검사(린트, 테스트, 빌드) 통과 필수
    - **병합:** `Squash and merge` (커밋 히스토리 깔끔하게 유지)
        1. **Squash (스쿼시):** 병합하려는 브랜치(예: feature/my-new-feature)의 **모든 커밋들을 하나로 합칩니다.** 여러 개의 작은 커밋("fix typo", "WIP", "refactor part 1", "add UI")이 하나의 새로운 커밋으로 묶이는 것
        2. **Merge (머지):** 하나로 합쳐진 **단일 커밋을 대상 브랜치(예: main)에 병합**

---

### 5. API 연동 및 데이터 관리

- **API 요청:** `React Query` 사용 시 해당 훅 내부에서 처리하거나, `lib/api/` 폴더에 API 호출 함수 분리.
- **상태 관리 (로딩/에러):** `React Query`의 내장 기능 적극 활용.
- **타입 정의 (TS):** API 응답 타입은 `lib/types/api/` 또는 관련 피처 폴더 내 `types/`에 명확히 정의.
- **환경 변수:** `.env.local` 사용, `.env.example` 제공. Next.js 규칙 준수 (`NEXT_PUBLIC_` 접두사).

---

### 6. 성능 및 접근성

- **성능:** Next.js 기본 최적화 (`next/image`, 동적 import 등) 적극 활용. `'use client'` 지시어 신중하게 사용.
- **접근성:** 시맨틱 HTML 사용 기본. 주요 기능 키보드 인터랙션 확인.

---

### 8. 문서화

- **필수:** `README.md` (프로젝트 설정, 실행 방법, 주요 결정 사항 요약)
- **권장:** 복잡한 컴포넌트나 함수에는 JSDoc 스타일 주석 사용.

### 9. etc..
- [Toss Slash(TypeScript/JavaScript 패키지)](https://www.slash.page/ko/)
- [React-Use(범용 커스텀 훅)](https://github.com/streamich/react-use?tab=readme-ov-file)
