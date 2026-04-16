export interface CatalogEntry {
  site: string;
  formId: string;
}

export interface SiteMeta {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export const SITE_ORDER: string[] = ["hutechc", "ai_ethics", "tesol"];

export const SITE_META: Record<string, SiteMeta> = {
  hutechc: { id: "hutechc", name: "휴텍씨", icon: "🏢", color: "#1a3a78" },
  ai_ethics: { id: "ai_ethics", name: "AI 윤리", icon: "⚖️", color: "#16a34a" },
  tesol: { id: "tesol", name: "TESOL", icon: "🎓", color: "#d97706" },
};

export const CATALOG: CatalogEntry[] = [
  { site: "hutechc", formId: "student_part1" },
  { site: "hutechc", formId: "student_part2" },
  { site: "hutechc", formId: "expert_part1" },
  { site: "hutechc", formId: "expert_part2" },
  { site: "hutechc", formId: "instructor_part1" },
  { site: "hutechc", formId: "instructor_part2" },
  { site: "ai_ethics", formId: "expert_apply" },
  { site: "ai_ethics", formId: "expert_part1" },
  { site: "ai_ethics", formId: "expert_part2" },
  { site: "ai_ethics", formId: "instructor_part1" },
  { site: "ai_ethics", formId: "instructor_part2" },
  { site: "tesol", formId: "instructor_apply" },
  { site: "tesol", formId: "teacher_apply" },
  { site: "tesol", formId: "student_part1" },
  { site: "tesol", formId: "student_part2" },
  { site: "tesol", formId: "expert_part1" },
  { site: "tesol", formId: "expert_part2" },
  { site: "tesol", formId: "instructor_part1" },
  { site: "tesol", formId: "instructor_part2" },
];

const ROLE_KO: Record<string, string> = {
  student: "학생",
  instructor: "강사",
  teacher: "강사",
  expert: "전문가",
  translator: "번역가",
  consultant: "컨설턴트",
};

const ROLE_API: Record<string, string> = {
  student: "student",
  instructor: "instructor",
  teacher: "instructor",
  expert: "expert",
  translator: "translator",
  consultant: "consultant",
};

export function roleKoreanOf(formId: string): string {
  const prefix = formId.split("_")[0];
  return ROLE_KO[prefix] ?? prefix;
}

export function roleApiOf(formId: string): string {
  const prefix = formId.split("_")[0];
  return ROLE_API[prefix] ?? "common";
}

export function phaseOf(formId: string): "part1" | "part2" {
  if (formId.endsWith("_part2")) return "part2";
  return "part1";
}

export function formsBySite(site: string): CatalogEntry[] {
  return CATALOG.filter((c) => c.site === site);
}
