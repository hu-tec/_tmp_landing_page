# AI 방과후 영어교사 양성과정 — 샘플 랜딩페이지

TESOL 기반 영어교육 역량에 AI 프롬프트 활용과 AI 윤리 교육을 결합한 **초등 방과후 AI 영어교사 양성과정**의 시범 랜딩페이지입니다. TIMES 브랜드(2004년 개국, TESOL 졸업생 3만 명+)의 기존 자산을 재구성한 사업 기획안을 시각화합니다.

> "AI를 가르치는 과정이 아니라, AI를 활용해 영어수업을 더 잘하는 교사를 만드는 과정"

## Live
- GitHub Pages: https://hu-tec.github.io/_tmp_landing_page/
- 커뮤니티: https://hu-tec.github.io/_tmp_landing_page/community/

## 1안 / 2안
| 구분 | 설명 | 이 repo에서 |
|------|------|-------------|
| 1안 | 랜딩 + 커뮤니티 동시 시연 | `/` + `/community` 모두 작동 |
| 2안 | 랜딩 본체 우선, 커뮤니티는 후속 | `/` 단독으로도 완결성 있음 |

2안 기준으로 랜딩 본체를 완성하되, `/community` 라우트에 **실제 동작하는 FAQ 아코디언 + 6카테고리 필터**를 함께 구현했기 때문에 1안 데모도 그대로 가능합니다.

## 주요 페이지
- `/` — Hero, 사업 정의, 왜 이 사업인가, 과정 구성(+가격), 핵심 메시지, 수익 구조, 모집 계획 타임라인, 강점, 확장 가능성, FAQ teaser, 문의
- `/community` — 공지사항 / FAQ / Q&A / 후기 4탭 + AI 윤리 6 카테고리 필터

## 실행
```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # 정적 export → out/
```

## 기술 스택
- Next.js 14 App Router, TypeScript strict, Tailwind CSS
- 정적 export (`output: 'export'`) + GitHub Pages
- lucide-react 아이콘
- Noto Sans KR (Google Fonts via `next/font`)

## 디렉토리
```text
src/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ globals.css
│  └─ community/page.tsx
├─ components/
│  ├─ layout/    (Header, Footer)
│  ├─ sections/  (Hero, Definition, WhyThis, Program, KeyMessage, Revenue, Recruitment, Strengths, Expansion, FaqTeaser, Contact)
│  ├─ community/ (CommunityExplorer)
│  └─ ui/        (Section, Button)
├─ data/   (landing.ts, faq.ts, community.ts, navigation.ts)
├─ types/  (landing.ts, community.ts)
└─ lib/    (utils.ts)
```

## 배포 (GitHub Pages)
`main` 브랜치에 push하면 GitHub Actions(`.github/workflows/pages.yml`)가 자동으로 `next build` → 정적 export → Pages 배포를 수행합니다.

- `next.config.mjs`에 `output: 'export'`, `basePath: '/_tmp_landing_page'`, `images.unoptimized: true` 설정 완료
- `public/.nojekyll`로 Jekyll 처리 차단

## 원본 기획안 반영
`docs/content-source.md`에 원본 문서(`AI 방과후 영어교사 양성과정.docx`, `Claude_Code_개발지침_AI방과후영어교사양성과정.docx`)에서 사이트로 옮긴 내용의 매핑을 기록했습니다.
