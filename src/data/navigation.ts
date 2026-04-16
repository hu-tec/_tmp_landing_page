export interface NavItem {
  label: string;
  href: string;
}

export const NAV: NavItem[] = [
  { label: "소개", href: "#definition" },
  { label: "대상", href: "#why" },
  { label: "과정구성", href: "#program" },
  { label: "수익구조", href: "#revenue" },
  { label: "모집계획", href: "#recruitment" },
  { label: "강점", href: "#strengths" },
  { label: "FAQ", href: "#faq" },
  { label: "신청서", href: "/applications" },
  { label: "커뮤니티", href: "/community" },
];
