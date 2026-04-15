import { Section } from "@/components/ui/Section";
import { RECRUITMENT } from "@/data/landing";

export function Recruitment() {
  return (
    <Section
      id="recruitment"
      eyebrow="모집 및 운영 계획"
      title="5·6·8월 모집 → 9월 초등 파견"
      description="TESOL 졸업생 3만 명 DB 기준 약 0.47% 전환만으로도 달성 가능한 규모입니다."
      inverted
      className="bg-navy-900"
    >
      <ol className="relative border-l border-white/15 pl-6 md:pl-10 space-y-10">
        {RECRUITMENT.map((r, i) => (
          <li key={r.month} className="relative">
            <span className="absolute -left-[34px] md:-left-[46px] top-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-burgundy-700 text-white text-xs font-black border-4 border-navy-900">
              {i + 1}
            </span>
            <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4">
              <div className="text-3xl md:text-4xl font-black text-burgundy-300 min-w-[6rem]">
                {r.month}
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white">
                {r.title}
              </h3>
            </div>
            <p className="mt-2 text-sm md:text-base text-navy-100/75 max-w-2xl leading-relaxed">
              {r.description}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-12 rounded-2xl border border-white/15 bg-white/[0.04] p-6 md:p-8">
        <div className="text-xs font-bold tracking-[0.2em] uppercase text-burgundy-300">
          모집처
        </div>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          <div>
            <div className="text-white font-bold">TIMES 전국 TESOL 졸업생</div>
            <div className="text-3xl md:text-4xl font-black text-white mt-1">
              3만 명+
            </div>
          </div>
          <div>
            <div className="text-white font-bold">국제통역번역협회 시험 인원</div>
            <div className="text-3xl md:text-4xl font-black text-white mt-1">
              30만 명
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm text-navy-100/70 leading-relaxed">
          연세대·신한대·평택대 → 부산·대구·강원 순으로 강의장 확장, 주요 언론사
          협력 및 타임스 자체 모집 후 전국 공유 강의실 운영도 병행합니다.
        </p>
      </div>
    </Section>
  );
}
