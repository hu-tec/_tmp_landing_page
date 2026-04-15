import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { FAQ } from "@/data/faq";
import { ArrowRight } from "lucide-react";

export function FaqTeaser() {
  const teaser = FAQ.slice(0, 4);
  return (
    <Section
      id="faq"
      eyebrow="자주 묻는 질문"
      title="대표가 가장 많이 받는 질문 4개"
      description="전체 FAQ는 커뮤니티 페이지에서 6개 카테고리별로 확인하실 수 있습니다."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {teaser.map((f) => (
          <details
            key={f.id}
            className="group rounded-2xl border border-navy-100 bg-white px-5 py-4 open:shadow-md open:border-navy-200 transition-all"
          >
            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
              <div>
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-burgundy-700">
                  {f.category}
                </span>
                <div className="mt-1 text-base md:text-lg font-bold text-navy-900">
                  {f.question}
                </div>
              </div>
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-navy-900 text-white text-sm group-open:rotate-45 transition-transform">
                +
              </span>
            </summary>
            <p className="mt-4 text-sm md:text-base text-navy-800/80 leading-relaxed">
              {f.answer}
            </p>
          </details>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/community"
          className="inline-flex items-center gap-2 rounded-full bg-navy-900 text-white px-6 py-3 text-sm font-semibold hover:bg-navy-800"
        >
          전체 FAQ · 커뮤니티 보기
          <ArrowRight size={16} />
        </Link>
      </div>
    </Section>
  );
}
