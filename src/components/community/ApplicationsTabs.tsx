"use client";
import { useState } from "react";
import {
  Briefcase,
  ExternalLink,
  GraduationCap,
  Languages,
  Scale,
} from "lucide-react";
import { cn, withBase } from "@/lib/utils";
import { WorkStudioForm } from "@/components/work-studio/WorkStudioForm";

type Slug = "instructor" | "expert" | "translator" | "ws-ai-ethics-expert";
type Kind = "iframe" | "workstudio";

interface FormDef {
  slug: Slug;
  label: string;
  short: string;
  description: string;
  Icon: typeof GraduationCap;
  kind: Kind;
  badge?: string;
}

const FORMS: FormDef[] = [
  {
    slug: "instructor",
    label: "강사 지원서",
    short: "강사",
    description:
      "초등 방과후 영어 + AI 강사 양성과정 지원자용 신청서. 출력형 1장 레이아웃 + 관리 대시보드 포함.",
    Icon: GraduationCap,
    kind: "iframe",
  },
  {
    slug: "expert",
    label: "전문가 지원서",
    short: "전문가",
    description:
      "AI 윤리 · 프롬프트 · 수업설계 전문가 풀에 등록하기 위한 1장 출력형 신청서.",
    Icon: Briefcase,
    kind: "iframe",
  },
  {
    slug: "translator",
    label: "번역가 지원서",
    short: "번역가",
    description:
      "ITT · AI 번역 확장 라인업을 위한 번역가 지원자용 신청서. 동일한 출력형 구조.",
    Icon: Languages,
    kind: "iframe",
  },
  {
    slug: "ws-ai-ethics-expert",
    label: "AI윤리 전문가",
    short: "AI윤리",
    description:
      "Work Studio에서 생성·수정되는 AI 윤리 전문가 신청서를 실시간 API로 불러와 그대로 렌더링합니다. 제출 데이터는 Work Studio DB에 바로 저장되며, 설정 새로고침 버튼으로 Work Studio 수정 내용을 즉시 반영해 확인할 수 있습니다.",
    Icon: Scale,
    kind: "workstudio",
    badge: "Work Studio",
  },
];

export function ApplicationsTabs() {
  const [active, setActive] = useState<Slug>("instructor");
  const current = FORMS.find((f) => f.slug === active)!;
  const iframeSrc =
    current.kind === "iframe"
      ? withBase(`/applications/${active}/index.html`)
      : null;

  return (
    <div>
      <div
        role="tablist"
        aria-label="신청서 종류"
        className="flex flex-wrap gap-2 border-b border-navy-100 pb-3"
      >
        {FORMS.map(({ slug, label, short, Icon, badge }) => {
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
              {badge && (
                <span
                  className={cn(
                    "ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                    selected
                      ? "bg-emerald-400 text-emerald-950"
                      : "bg-emerald-100 text-emerald-700"
                  )}
                >
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm md:text-base text-navy-800/80 max-w-3xl leading-relaxed">
          {current.description}
        </p>
        {iframeSrc && (
          <a
            href={iframeSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-navy-200 bg-white px-3 py-1.5 text-xs font-semibold text-navy-800 hover:border-navy-400"
          >
            새 창에서 열기 <ExternalLink size={12} />
          </a>
        )}
      </div>

      <div className="mt-5">
        {current.kind === "iframe" ? (
          <div className="overflow-hidden rounded-2xl border border-navy-200 bg-gray-50 shadow-sm">
            <iframe
              key={active}
              src={iframeSrc!}
              title={current.label}
              className="block w-full h-[78vh] min-h-[640px] bg-white"
              loading="lazy"
            />
          </div>
        ) : (
          <WorkStudioForm />
        )}
      </div>

      {current.kind === "iframe" && (
        <p className="mt-4 text-[11px] text-navy-800/55">
          각 신청서는 독립 Vite + React 빌드 산출물(메모리 라우터)로, 본 페이지의 iframe에 임베드되어 동작합니다.
        </p>
      )}
    </div>
  );
}
