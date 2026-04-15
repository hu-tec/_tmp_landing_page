# 콘텐츠 출처 및 반영 매핑

원본 자료는 `~/_tmp_landingpage/` 디렉토리의 다음 두 파일이다.

- `AI 방과후 영어교사 양성과정.docx` — 사업 기획안 원본
- `Claude_Code_개발지침_AI방과후영어교사양성과정.docx` — Claude Code 작업 지침

## 사이트 반영 매핑

| 원본 항목 | 파일 위치 | 반영 위치 |
|-----------|-----------|-----------|
| 사업 정의 / 핵심 메시지 | 기획안 §1 | `src/data/landing.ts` → `HERO`, `DEFINITION_BULLETS`, `KEY_MESSAGE` |
| 왜 이 사업인가 (학생/학부모/학교/회사) | 기획안 §3 | `AUDIENCE` → `WhyThis.tsx` |
| 상품 구조 (이론 45h + 실습 30h) | 기획안 §4 | `PROGRAM_BLOCKS`, `AFTERSCHOOL_CONTENT` → `Program.tsx` |
| 가격 구조 | 기획안 §6 | `PRICING` → `Program.tsx` 테이블 |
| 수익 구조 3단 | 기획안 §5 | `REVENUE` → `Revenue.tsx` |
| 모집 및 운영 계획 | 기획안 §7, §8 | `RECRUITMENT` → `Recruitment.tsx` |
| 강점 4가지 | 기획안 §8 | `STRENGTHS` → `Strengths.tsx` |
| 확장 가능 프로그램 | 기획안 §9 | `EXPANSION` → `Expansion.tsx` |
| FAQ 18건 (6 카테고리 × 3) | 지침 §FAQ 샘플 | `src/data/faq.ts` → `/community` |
| 커뮤니티 IA (공지/FAQ/Q&A/후기 + 6 카테고리) | 지침 §커뮤니티 | `src/types/community.ts`, `CommunityExplorer.tsx` |

## 기획안 주의사항
- 수치·일정·자격증 정보는 **기획안 기준**으로, 운영 시 변경될 수 있다.
- 법적 확정 표현은 피하고, 시범/기획안 성격을 footer에 명시했다.
- 없는 정책·인증·기관 협업은 새로 만들지 않았다.

## 샘플 vs 실데이터
| 영역 | 데이터 성격 |
|------|-------------|
| 랜딩 본체 모든 수치/구조 | 기획안 원본 수치 |
| FAQ 18건 | 지침 원본 텍스트 |
| 공지사항 3건 | 기획안 맥락에 맞춘 샘플 카드 |
| Q&A 3건 | 기획안 맥락에 맞춘 샘플 카드 |
| 후기 2건 | 기획안 맥락에 맞춘 샘플 카드 |
