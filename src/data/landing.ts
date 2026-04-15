import type {
  HeroContent,
  AudiencePoint,
  ProgramBlock,
  RevenueStage,
  PricingRow,
  RecruitmentStep,
  StrengthCard,
  ExpansionItem,
} from "@/types/landing";

export const HERO: HeroContent = {
  eyebrow: "TIMES · 2004년부터 TESOL 졸업생 3만 명",
  title: "AI 방과후 영어교사 양성과정",
  subtitle:
    "TESOL 기반 영어교육 역량에 AI 프롬프트 활용과 AI 윤리 교육을 결합하여, 초등 방과후 영어수업이 가능한 AI 영어교사를 양성합니다.",
  bullets: [
    "TESOL + AI 프롬프트 + AI 윤리 결합형 커리큘럼",
    "영상 · 음성 · 이미지 프롬프트 수업 20클라스 + AI 윤리 10클라스",
    "실습 · 심화 30시간 별도 운영, 총 74시간 과정",
  ],
  ctas: [
    { label: "과정 소개 보기", href: "#definition", variant: "primary" },
    { label: "모집 일정 보기", href: "#recruitment", variant: "ghost" },
  ],
};

export const DEFINITION_BULLETS: string[] = [
  "기존 TESOL 역량 위에 AI 프롬프트 활용과 AI 윤리 교육을 결합",
  "초등 방과후 영어수업이 가능한 AI 영어교사를 양성",
  "새 사업을 처음 만드는 것이 아니라, 기존 자산을 수익형 방과후 상품으로 재구성",
];

export const KEY_MESSAGE =
  "AI를 가르치는 과정이 아니라, AI를 활용해 영어수업을 더 잘하는 교사를 만드는 과정";

export const AUDIENCE: AudiencePoint[] = [
  {
    key: "학생",
    title: "흥미와 참여도",
    body: "AI를 활용한 영어수업은 학생의 몰입을 끌어올리고, 영상·음성·이미지 콘텐츠로 기존 방과후 수업과 명확히 차별화됩니다.",
  },
  {
    key: "학부모",
    title: "AI 윤리로 신뢰 확보",
    body: "AI 활용법과 함께 표절·저작권·개인정보·허위정보 판별까지 가르치기 때문에 학부모가 안심하고 보낼 수 있는 수업입니다.",
  },
  {
    key: "학교",
    title: "영어 + AI + 윤리 결합형",
    body: "기존 방과후 영어 수업만으로는 제공하기 어려운 융합형 커리큘럼으로, 학교의 차별화 프로그램 수요를 충족합니다.",
  },
  {
    key: "회사",
    title: "3만 명 DB 즉시 활용",
    body: "2004년부터 운영된 TESOL 졸업생 3만 명 DB에 바로 홍보가 가능하며, 140명 모집은 약 0.47% 전환만으로도 달성됩니다.",
  },
];

export const PROGRAM_BLOCKS: ProgramBlock[] = [
  {
    title: "이론 45시간",
    hours: "TESOL 15h · 프롬프트 15h · 윤리 15h",
    items: [
      "TESOL 영어 교수법 기반",
      "AI 프롬프트 — 음성·영상·이미지 제작 실습",
      "AI 윤리 — 저작권·표절·개인정보·허위정보",
    ],
  },
  {
    title: "실습 30시간",
    hours: "심화 별도 운영",
    items: [
      "프롬프트 기반 수업 콘텐츠 제작",
      "영어 + AI 결합 수업 시연 실습",
      "현장 파견 시뮬레이션 및 피드백",
    ],
  },
  {
    title: "수업 운영",
    hours: "45분 × 2 = 1회 90분",
    items: [
      "총 30클라스 커리큘럼",
      "영상·음성·이미지 프롬프트 20클라스",
      "AI 윤리 10클라스",
    ],
  },
];

export const AFTERSCHOOL_CONTENT: { title: string; body: string }[] = [
  {
    title: "영어로 진행하는 AI 수업",
    body: "프롬프트로 만드는 영상·음성·이미지 콘텐츠와 영어활동을 결합한 방과후 수업.",
  },
  {
    title: "AI로 진행하는 영어공부 수업",
    body: "영어회화 · 한국알리기 · 한국문화사절단 · 주니어사절단 · 통역사절단 형식의 실전 수업.",
  },
  {
    title: "초등 파견 수업 구성",
    body: "프롬프트 수업 + 콘텐츠 활동 10분 + AI 윤리 10분 구성으로 매 회차 운영.",
  },
];

export const REVENUE: RevenueStage[] = [
  {
    stage: "1차",
    label: "강사양성 수익",
    items: ["강사 양성과정 수강료", "자격증 비용", "교재비"],
  },
  {
    stage: "2차",
    label: "학교 파견 · 교재 수익",
    items: ["학교 파견 운영 수익", "학생용 교재 판매", "수업 피드백 · 온라인 연계"],
  },
  {
    stage: "3차",
    label: "자격증 발급 수익",
    items: ["AI 프롬프트 자격증 발급", "AI 윤리 자격증 발급", "국제통역번역협회 민간자격"],
  },
];

export const PRICING: PricingRow[] = [
  { label: "이론 45시간", value: "100만원" },
  { label: "실습 30시간", value: "80만원" },
  { label: "이론 + 실습 통합", value: "180만원", note: "TESOL 졸업생 30% 할인" },
  { label: "교재비", value: "58,000원", note: "자격증비 별도" },
  { label: "AI 프롬프트 자격증", value: "60,000원" },
  { label: "AI 윤리 자격증", value: "60,000원" },
  { label: "학생 파견 교재비", value: "18,000원", note: "강사 지급 40%" },
];

export const RECRUITMENT: RecruitmentStep[] = [
  {
    month: "5월",
    title: "1차 모집 20명",
    description: "연세대 · 신한대 · 평택대 강의장 중심으로 첫 기수 모집.",
  },
  {
    month: "6월",
    title: "2차 모집 20명",
    description: "부산·대구·강원 권역으로 강의장 확장, 지역 네트워크 가동.",
  },
  {
    month: "8월",
    title: "방학 특강 100명",
    description: "여름 방학 집중 과정, 9월 파견을 위한 대규모 기수.",
  },
  {
    month: "9월",
    title: "방과후 학교 파견",
    description: "양성 수료생을 초등 방과후 영어 AI 수업에 순차 파견 개시.",
  },
];

export const STRENGTHS: StrengthCard[] = [
  {
    title: "기존 브랜드·자산 즉시 활용",
    body: "2004년부터 운영된 TIMES TESOL 브랜드와 커리큘럼 자산을 재구성형으로 사용.",
  },
  {
    title: "이해하기 쉬운 상품 구조",
    body: "학생 · 학부모 · 학교 모두 5초 안에 가치가 이해되는 3자 친화형 상품.",
  },
  {
    title: "수익 다변화",
    body: "강사양성 + 교재 + 자격증 + 파견 운영의 4개 수익원으로 안정적 매출 구조.",
  },
  {
    title: "확장 가능한 플랫폼",
    body: "ITT · AI 번역 · 주니어 문화사절단 등 기존 자산과 쉽게 이어지는 확장성.",
  },
];

export const EXPANSION: ExpansionItem[] = [
  { title: "ITT 통번역", body: "국제통역번역협회 연계형 파생 과정." },
  { title: "AI 번역", body: "프롬프트 기반 번역 실무 교육으로 확장." },
  { title: "주니어 한국문화 사절단", body: "주니어 대상 AI 한국알리기 수업." },
  { title: "AI 영상·이미지 수업", body: "영어로 진행하는 영상/이미지 AI 창작 수업." },
];

export const STATS: { value: string; label: string }[] = [
  { value: "3만+", label: "TESOL 졸업생 DB" },
  { value: "74h", label: "이론 45 + 실습 30 (심화 포함)" },
  { value: "140명", label: "5·6·8월 누적 모집 목표" },
  { value: "9월", label: "초등 방과후 파견 개시" },
];
