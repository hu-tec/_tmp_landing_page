import { Section } from "@/components/ui/Section";
import { REVENUE } from "@/data/landing";
import { ArrowRight } from "lucide-react";

export function Revenue() {
  return (
    <Section
      id="revenue"
      eyebrow="수익 구조"
      title="강사양성 → 학교 파견 → 자격증의 3단 수익"
      description="강사양성 수강료에서 끝나지 않고, 학교 파견 운영·교재 판매·민간 자격증 발급까지 수익 구조를 단계적으로 확장합니다."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {REVENUE.map((r, i) => (
          <div
            key={r.stage}
            className="relative rounded-2xl border border-navy-100 bg-white p-6 flex flex-col"
          >
            <div className="flex items-center justify-between">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-burgundy-700 text-white font-black">
                {r.stage}
              </div>
              {i < REVENUE.length - 1 && (
                <ArrowRight className="hidden md:block text-navy-300" size={20} />
              )}
            </div>
            <h3 className="mt-5 text-xl font-black text-navy-900">{r.label}</h3>
            <ul className="mt-4 space-y-2 text-sm text-navy-800/80">
              {r.items.map((it) => (
                <li
                  key={it}
                  className="rounded-lg bg-navy-50 px-3 py-2 font-medium text-navy-800"
                >
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
