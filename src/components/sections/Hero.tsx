import { HERO, STATS } from "@/data/landing";
import { CTAButton } from "@/components/ui/Button";
import { Sparkles, GraduationCap, ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white pt-40 pb-24 md:pt-48 md:pb-32">
      <div className="absolute inset-0 bg-grid opacity-[0.15]" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-900/90 to-navy-950" />
      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-burgundy-700/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-navy-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-navy-100">
          <Sparkles size={14} className="text-burgundy-300" />
          {HERO.eyebrow}
        </div>

        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] text-balance">
          {HERO.title}
        </h1>
        <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-navy-100/85">
          {HERO.subtitle}
        </p>

        <ul className="mt-8 grid gap-3 max-w-2xl">
          {HERO.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3 text-sm md:text-base text-navy-100/90">
              <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-burgundy-700/90">
                {i === 0 ? (
                  <GraduationCap size={12} />
                ) : i === 1 ? (
                  <Sparkles size={12} />
                ) : (
                  <ShieldCheck size={12} />
                )}
              </span>
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-3">
          {HERO.ctas.map((c) => (
            <CTAButton key={c.label} href={c.href} variant={c.variant ?? "primary"}>
              {c.label}
            </CTAButton>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-5 backdrop-blur-sm"
            >
              <div className="text-3xl md:text-4xl font-black text-white">
                {s.value}
              </div>
              <div className="mt-1 text-xs md:text-sm text-navy-100/70 leading-snug">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
