export interface HeroContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  bullets: string[];
  ctas: { label: string; href: string; variant?: "primary" | "ghost" }[];
}

export interface AudiencePoint {
  key: "학생" | "학부모" | "학교" | "회사";
  title: string;
  body: string;
}

export interface ProgramBlock {
  title: string;
  hours: string;
  items: string[];
}

export interface RevenueStage {
  stage: "1차" | "2차" | "3차";
  label: string;
  items: string[];
}

export interface PricingRow {
  label: string;
  value: string;
  note?: string;
}

export interface RecruitmentStep {
  month: string;
  title: string;
  description: string;
}

export interface StrengthCard {
  title: string;
  body: string;
}

export interface ExpansionItem {
  title: string;
  body: string;
}
