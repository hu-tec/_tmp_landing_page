import { Section } from "@/components/ui/Section";
import { DEFINITION_BULLETS } from "@/data/landing";
import { BookOpen, Layers, Recycle } from "lucide-react";

const ICONS = [BookOpen, Layers, Recycle];

export function Definition() {
  return (
    <Section
      id="definition"
      eyebrow="사업 정의"
      title={<>기존 자산을 재구성한<br className="hidden md:block" /> 수익형 방과후 상품</>}
      description="타임스는 이미 TESOL · AI 프롬프트 · AI 윤리 · ITT · AI 번역으로 이어지는 교육 자산을 보유하고 있습니다. 이 과정은 그 위에 방과후 수업 트랙을 얹는 재구성형 사업입니다."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {DEFINITION_BULLETS.map((b, i) => {
          const Icon = ICONS[i];
          return (
            <div
              key={i}
              className="group rounded-2xl border border-navy-100 bg-white p-6 hover:border-navy-300 hover:shadow-md transition-all"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900 text-white">
                <Icon size={20} />
              </div>
              <p className="mt-5 text-base md:text-lg font-semibold leading-snug text-navy-900">
                {b}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
