import { Section } from "@/components/ui/Section";
import { PROGRAM_BLOCKS, AFTERSCHOOL_CONTENT, PRICING } from "@/data/landing";
import { CheckCircle2 } from "lucide-react";

export function Program() {
  return (
    <Section
      id="program"
      eyebrow="과정 구성"
      title="이론 45시간 + 실습 30시간, 총 74시간"
      description="TESOL 교수법 위에 AI 프롬프트 활용과 AI 윤리 교육이 얹혀지고, 실습과 심화 수업이 별도로 운영됩니다."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {PROGRAM_BLOCKS.map((p, i) => (
          <div
            key={p.title}
            className="relative rounded-2xl border border-navy-100 bg-white p-6 flex flex-col"
          >
            <div className="absolute top-5 right-5 text-5xl font-black text-navy-100">
              0{i + 1}
            </div>
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-burgundy-700">
              Module 0{i + 1}
            </div>
            <h3 className="mt-1 text-2xl font-black text-navy-900">{p.title}</h3>
            <div className="mt-1 text-sm font-medium text-navy-800/70">{p.hours}</div>
            <ul className="mt-5 space-y-2">
              {p.items.map((it) => (
                <li key={it} className="flex items-start gap-2 text-sm text-navy-800/85">
                  <CheckCircle2 size={16} className="mt-0.5 text-burgundy-700 shrink-0" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {AFTERSCHOOL_CONTENT.map((c) => (
          <div
            key={c.title}
            className="rounded-2xl bg-navy-900 text-white p-6"
          >
            <h4 className="text-base font-bold text-white">{c.title}</h4>
            <p className="mt-2 text-sm text-navy-100/80 leading-relaxed">{c.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-navy-100 overflow-hidden">
        <div className="bg-navy-900 text-white px-6 py-4">
          <h4 className="text-sm font-bold tracking-wide">가격 구조 (기획안 기준)</h4>
        </div>
        <div className="divide-y divide-navy-100">
          {PRICING.map((row) => (
            <div
              key={row.label}
              className="flex items-baseline justify-between px-6 py-3 text-sm md:text-base bg-white"
            >
              <div className="text-navy-900 font-medium">{row.label}</div>
              <div className="flex items-baseline gap-3">
                {row.note && (
                  <span className="text-xs text-burgundy-700 font-semibold">
                    {row.note}
                  </span>
                )}
                <span className="font-black text-navy-900">{row.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
