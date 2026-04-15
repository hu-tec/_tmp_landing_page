import type { CommunityItem } from "@/types/community";

export const NOTICES: CommunityItem[] = [
  {
    id: "no-1",
    tab: "공지사항",
    title: "AI 방과후 영어교사 양성과정 1차 모집 안내 (5월)",
    summary: "5월 20명 대상 1기 모집. 연세대·신한대·평택대 강의장 운영.",
    date: "2026-04-10",
    author: "TIMES",
  },
  {
    id: "no-2",
    tab: "공지사항",
    title: "TESOL 졸업생 통합 신청 30% 할인 안내",
    summary: "기존 TESOL 졸업생은 이론+실습 통합 신청 시 30% 할인 적용.",
    date: "2026-04-08",
    author: "TIMES",
  },
  {
    id: "no-3",
    tab: "공지사항",
    title: "9월 초등 방과후 파견 학교 접수 시작",
    summary: "8월 여름 특강 수료생 기준으로 9월부터 순차 파견됩니다.",
    date: "2026-04-02",
    author: "TIMES",
  },
];

export const QNA: CommunityItem[] = [
  {
    id: "qa-1",
    tab: "Q&A",
    category: "교육내용",
    title: "영어 교사가 아닌 일반 강사도 지원 가능한가요?",
    summary: "지원 가능합니다. 다만 TESOL 미보유자는 별도 영어 교수법 20클라스를 먼저 이수합니다.",
    date: "2026-04-11",
    author: "예비 지원자",
  },
  {
    id: "qa-2",
    tab: "Q&A",
    category: "AI윤리",
    title: "AI 윤리 자격증은 어디서 인정되나요?",
    summary: "국제통역번역협회(ITT) 민간자격으로 발급되며, 기관·학교 파견 시 가산점 자료로 활용됩니다.",
    date: "2026-04-09",
    author: "현직 교사",
  },
  {
    id: "qa-3",
    tab: "Q&A",
    category: "대상",
    title: "실습 30시간은 온라인으로도 수강 가능한가요?",
    summary: "이론은 온라인 수강이 가능하지만, 실습 30시간은 오프라인 또는 실시간 화상 기반 진행을 원칙으로 합니다.",
    date: "2026-04-05",
    author: "학부모",
  },
];

export const REVIEWS: CommunityItem[] = [
  {
    id: "rv-1",
    tab: "후기",
    category: "교육내용",
    title: "TESOL 출신인데 AI 프롬프트 수업까지 받으니 확실히 다르네요",
    summary: "이미 영어 교수법은 익숙했는데, 프롬프트 15시간과 실습이 수업 설계를 바꿔줬습니다.",
    date: "2026-04-03",
    author: "1기 예비 수강자",
  },
  {
    id: "rv-2",
    tab: "후기",
    category: "AI윤리",
    title: "학부모 설명회에서 'AI 윤리까지 한다'는 말이 가장 반응이 좋았어요",
    summary: "신뢰 요소가 명확해서 방과후 신청률이 체감적으로 높아질 것 같습니다.",
    date: "2026-03-28",
    author: "학교 담당자",
  },
];

export const ALL_COMMUNITY: CommunityItem[] = [...NOTICES, ...QNA, ...REVIEWS];
