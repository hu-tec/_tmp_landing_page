"use client";
import { useEffect, useState } from "react";
import {
  Briefcase,
  ExternalLink,
  GraduationCap,
  Languages,
  Scale,
  Megaphone,
} from "lucide-react";
import { cn, withBase } from "@/lib/utils";
import { WorkStudioBrowser } from "@/components/work-studio/WorkStudioBrowser";
import { RecruitApplyForm } from "@/components/applications/RecruitApplyForm";

type Slug =
  | "recruit"
  | "instructor"
  | "expert"
  | "translator"
  | "ws-catalog";
type Kind = "iframe" | "workstudio" | "native";

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
    slug: "recruit",
    label: "모집 신청",
    short: "모집",
    description:
      "AI 방과후 영어교사 양성과정 기수 모집을 위한 공식 신청서입니다. 기수(5/6/8월) · 강의장 · TESOL 이수 여부 · AI 활용 경험 등을 받아 담당자에게 전달되며, TESOL 졸업생 30% 할인도 여기서 접수됩니다.",
    Icon: Megaphone,
    kind: "native",
    badge: "기수 모집",
  },
  {
    slug: "instructor",
    label: "강사 지원서",
    short: "강사",
    description:
      "초등 방과후 영어 + AI 강사 양성과정 지원자용 1장 출력형 신청서.",
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
    slug: "ws-catalog",
    label: "Work Studio 모듈",
    short: "WS 모듈",
    description:
      "Work Studio에서 생성·수정되는 신청서 모듈 19종(hutechc·AI윤리·TESOL × 학생·강사·전문가×part1/2 및 apply 래퍼)을 실시간 API로 불러와 그대로 렌더링합니다. 모듈 활성화 정책은 추후 확정.",
    Icon: Scale,
    kind: "workstudio",
    badge: "Work Studio",
  },
];

const VALID_SLUGS: Slug[] = FORMS.map((f) => f.slug);

function readHashSlug(): Slug | null {
  if (typeof window === "undefined") return null;
  const raw = window.location.hash.replace(/^#/, "");
  return (VALID_SLUGS as string[]).includes(raw) ? (raw as Slug) : null;
}

export function ApplicationsTabs() {
  const [active, setActive] = useState<Slug>("recruit");

  useEffect(() => {
    const sync = () => {
      const s = readHashSlug();
      if (s) setActive(s);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const select = (s: Slug) => {
    setActive(s);
    if (typeof window !== "undefined") {
      const next = `#${s}`;
      if (window.location.hash !== next) {
        history.replaceState(null, "", `${window.location.pathname}${window.location.search}${next}`);
      }
    }
  };

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
        {FORMS.map(({ slug, label, short, Icon, badge, kind }) => {
          const selected = active === slug;
          const recruit = slug === "recruit";
          return (
            <button
              key={slug}
              role="tab"
              aria-selected={selected}
              onClick={() => select(slug)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-colors",
                selected
                  ? recruit
                    ? "bg-burgundy-700 text-white"
                    : "bg-navy-900 text-white"
                  : recruit
                    ? "bg-burgundy-50 text-burgundy-800 border border-burgundy-200 hover:border-burgundy-400"
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
                      ? kind === "native"
                        ? "bg-white text-burgundy-700"
                        : "bg-emerald-400 text-emerald-950"
                      : kind === "native"
                        ? "bg-burgundy-700 text-white"
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
        ) : current.kind === "workstudio" ? (
          <WorkStudioBrowser />
        ) : (
          <RecruitApplyForm />
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
