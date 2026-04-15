# CLAUDE.md

## 프로젝트 목적
이 프로젝트는 **AI 방과후 영어교사 양성과정**을 소개하는 샘플 홈페이지를 구현하는 것이 목적이다. 이 과정은 **TESOL 기반 영어교육 역량에 AI 프롬프트 활용과 AI 윤리 교육을 결합**하여, **초등 방과후 영어수업이 가능한 AI 영어교사**를 양성하는 프로그램이다. 핵심 메시지는 **AI를 가르치는 과정이 아니라, AI를 활용해 영어수업을 더 잘하는 교사를 만드는 과정**이라는 점이다.

## 1안/2안 대응
- **1안**: 랜딩페이지 + 커뮤니티 동시 시연
- **2안**: 랜딩페이지 본체 먼저 완성, 커뮤니티는 후속
- 본 repo는 **2안 기준으로 먼저 완성**하되, `/community` 라우트가 실제 작동하는 형태로 구현되어 있어 **1안도 즉시 시연 가능**하다.

## 정보 구조
- `/` : 랜딩 본체 (Hero → Definition → WhyThis → Program → KeyMessage → Revenue → Recruitment → Strengths → Expansion → FaqTeaser → Contact)
- `/community` : 4탭(공지/FAQ/Q&A/후기) × 6 카테고리 필터 × FAQ 실동작 아코디언

## 기술 스택
- Next.js 14 (App Router) · TypeScript · Tailwind CSS · lucide-react
- 정적 export(`output: 'export'`) + GitHub Pages 배포
- `basePath` = `/_tmp_landing_page` (프로덕션)

## 배포
- `main` push → GitHub Actions (`.github/workflows/pages.yml`) → Pages 배포
- 배포 URL: https://hu-tec.github.io/_tmp_landing_page/

## Claude Code 작업 방식
1. 데이터는 `src/data/*.ts`에만 둔다. 컴포넌트 하드코딩 금지.
2. 새 섹션 추가 시 `src/components/sections/`에 두고 `app/page.tsx`에서 import.
3. 커뮤니티 탭·카테고리는 `src/types/community.ts` 상수에서만 편집.
4. 내부 링크는 `Link`, 앵커(`#`)는 `a` 사용.
5. 이미지가 필요한 경우 `public/`에 두고 `withBase()` 유틸 사용.
