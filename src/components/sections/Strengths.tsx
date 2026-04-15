import { Section } from "@/components/ui/Section";
import { STRENGTHS } from "@/data/landing";

export function Strengths() {
  return (
    <Section
      id="strengths"
      eyebrow="타임스의 강점"
      title="빠르게 시작할 수 있는 4가지 이유"
      description="새 사업을 만드는 것이 아니라, 이미 가지고 있는 자산을 현금화하기 가장 좋은 타이밍입니다."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {STRENGTHS.map((s, i) => (
          <div
            key={s.title}
            className="rounded-2xl border border-navy-100 bg-white p-6 md:p-7 flex gap-5"
          >
            <div className="shrink-0 text-5xl font-black text-burgundy-700/15 leading-none">
              0{i + 1}
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-black text-navy-900">{s.title}</h3>
              <p className="mt-2 text-sm md:text-base text-navy-800/80 leading-relaxed">
                {s.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
