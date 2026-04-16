"use client";
import { useState } from "react";
import { GraduationCap, Briefcase, Languages, ExternalLink } from "lucide-react";
import { withBase } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Slug = "instructor" | "expert" | "translator";

interface FormDef {
  slug: Slug;
  label: string;
  short: string;
  description: string;
  Icon: typeof GraduationCap;
}

const FORMS: FormDef[] = [
  {
    slug: "instructor",
    label: "강사 지원서",
    short: "강사",
    description:
      "초등 방과후 영어 + AI 강사 양성과정 지원자용 신청서. 출력형 1장 레이아웃 + 관리 대시보드 포함.",
    Icon: GraduationCap,
  },
  {
    slug: "expert",
    label: "전문가 지원서",
    short: "전문가",
    description:
      "AI 윤리 · 프롬프트 · 수업설계 전문가 풀에 등록하기 위한 1장 출력형 신청서.",
    Icon: Briefcase,
  },
  {
    slug: "translator",
    label: "번역가 지원서",
    short: "번역가",
    description:
      "ITT · AI 번역 확장 라인업을 위한 번역가 지원자용 신청서. 동일한 출력형 구조.",
    Icon: Languages,
  },
];

export function ApplicationsTabs() {
  const [active, setActive] = useState<Slug>("instructor");
  const current = FORMS.find((f) => f.slug === active)!;
  const src = withBase(`/applications/${active}/index.html`);

  return (
    <div>
      <div
        role="tablist"
        aria-label="신청서 종류"
        className="flex flex-wrap gap-2 border-b border-navy-100 pb-3"
      >
        {FORMS.map(({ slug, label, short, Icon }) => {
          const selected = active === slug;
          return (
            <button
              key={slug}
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(slug)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-colors",
                selected
                  ? "bg-navy-900 text-white"
                  : "bg-white text-navy-800 border border-navy-200 hover:border-navy-400"
              )}
            >
              <Icon size={15} />
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{short}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm md:text-base text-navy-800/80 max-w-3xl leading-relaxed">
          {current.description}
        </p>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-navy-200 bg-white px-3 py-1.5 text-xs font-semibold text-navy-800 hover:border-navy-400"
        >
          새 창에서 열기 <ExternalLink size={12} />
        </a>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-navy-200 bg-gray-50 shadow-sm">
        <iframe
          key={active}
          src={src}
          title={current.label}
          className="block w-full h-[78vh] min-h-[640px] bg-white"
          loading="lazy"
        />
      </div>

      <p className="mt-4 text-[11px] text-navy-800/55">
        각 신청서는 독립 Vite + React 빌드 산출물(메모리 라우터)로, 본 페이지의 iframe에 임베드되어 동작합니다.
      </p>
    </div>
  );
}
