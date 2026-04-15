"use client";
import { LayoutGrid, Layers, Sparkles } from "lucide-react";
import { usePlan, type Plan } from "./PlanContext";
import { cn } from "@/lib/utils";

const OPTIONS: {
  value: Plan;
  title: string;
  Icon: typeof LayoutGrid;
  note: string;
}[] = [
  {
    value: "1안",
    title: "1안 · 랜딩 + 커뮤니티",
    Icon: LayoutGrid,
    note: "첫 시연부터 공지·FAQ·Q&A·후기 풀셋 포함",
  },
  {
    value: "2안",
    title: "2안 · 랜딩 우선",
    Icon: Layers,
    note: "랜딩 본체 먼저 · 커뮤니티는 2차 배포",
  },
];

export function PlanSwitcher() {
  const { plan, setPlan, mounted } = usePlan();
  const active = OPTIONS.find((o) => o.value === plan) ?? OPTIONS[1];

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-11 bg-navy-950 text-white border-b border-white/10">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-3 px-4 md:px-8">
        <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em] uppercase text-burgundy-300">
          <Sparkles size={13} />
          대표 보고용 안 선택
        </div>

        <div
          role="tablist"
          aria-label="1안/2안 전환"
          className="flex items-center gap-1 rounded-full bg-white/[0.06] p-1 ring-1 ring-white/10"
        >
          {OPTIONS.map(({ value, title, Icon }) => {
            const selected = plan === value;
            return (
              <button
                key={value}
                role="tab"
                aria-selected={selected}
                onClick={() => setPlan(value)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] md:text-[13px] font-semibold transition-all whitespace-nowrap",
                  selected
                    ? "bg-burgundy-700 text-white shadow"
                    : "text-navy-100/75 hover:text-white"
                )}
              >
                <Icon size={13} />
                {title}
              </button>
            );
          })}
        </div>

        <div className="hidden md:block text-[11px] text-navy-100/60 max-w-[18rem] truncate">
          {mounted ? active.note : OPTIONS[1].note}
        </div>
      </div>
    </div>
  );
}
