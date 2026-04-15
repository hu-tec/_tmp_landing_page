export type FaqCategory =
  | "대상"
  | "해외"
  | "교육내용"
  | "AI윤리"
  | "사례·이슈"
  | "저작권·표절·보안·개인정보";

export const FAQ_CATEGORIES: FaqCategory[] = [
  "대상",
  "해외",
  "교육내용",
  "AI윤리",
  "사례·이슈",
  "저작권·표절·보안·개인정보",
];

export type CommunityTab = "공지사항" | "FAQ" | "Q&A" | "후기";
export const COMMUNITY_TABS: CommunityTab[] = ["공지사항", "FAQ", "Q&A", "후기"];

export interface FaqItem {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
}

export interface CommunityItem {
  id: string;
  tab: CommunityTab;
  category?: FaqCategory;
  title: string;
  summary?: string;
  content?: string;
  date?: string;
  author?: string;
}
