import { Section } from "@/components/ui/Section";
import { EXPANSION } from "@/data/landing";
import { Globe2 } from "lucide-react";

export function Expansion() {
  return (
    <Section
      id="expansion"
      eyebrow="확장 가능성"
      title="다음 단계의 제품 라인업"
      description="ITT 통번역, AI 번역, 주니어 한국문화 사절단, 영어로 하는 영상/이미지 AI 수업까지 같은 자산으로 확장 가능합니다."
      className="bg-parchment"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {EXPANSION.map((e) => (
          <div
            key={e.title}
            className="rounded-2xl border border-navy-100 bg-white p-5 flex flex-col"
          >
            <Globe2 size={20} className="text-burgundy-700" />
            <h3 className="mt-4 text-base md:text-lg font-black text-navy-900">
              {e.title}
            </h3>
            <p className="mt-2 text-sm text-navy-800/75 leading-relaxed">{e.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
