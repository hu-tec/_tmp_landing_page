import { KEY_MESSAGE } from "@/data/landing";

export function KeyMessage() {
  return (
    <section className="relative bg-navy-900 text-white py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.12]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-burgundy-500/60 to-transparent" />
      <div className="relative mx-auto max-w-4xl px-5 md:px-8 text-center">
        <div className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-burgundy-300">
          Core Message
        </div>
        <blockquote className="mt-6 text-2xl sm:text-3xl md:text-5xl font-black leading-[1.25] text-balance">
          “{KEY_MESSAGE}”
        </blockquote>
        <div className="mt-8 inline-flex items-center gap-2 text-xs text-navy-100/60">
          <span className="inline-block h-px w-10 bg-navy-100/30" />
          TIMES · AI 방과후 영어교사 양성과정
          <span className="inline-block h-px w-10 bg-navy-100/30" />
        </div>
      </div>
    </section>
  );
}
