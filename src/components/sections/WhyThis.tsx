import { Section } from "@/components/ui/Section";
import { AUDIENCE } from "@/data/landing";
import { Users, Home, School, Building2 } from "lucide-react";

const ICONS = { 학생: Users, 학부모: Home, 학교: School, 회사: Building2 } as const;

export function WhyThis() {
  return (
    <Section
      id="why"
      eyebrow="왜 이 사업인가"
      title="학생·학부모·학교·회사 모두 Yes"
      description="AI + 영어 + 윤리라는 3요소가 어떤 이해관계자에게도 거부감 없이 작동합니다."
      className="bg-parchment"
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {AUDIENCE.map((a) => {
          const Icon = ICONS[a.key];
          return (
            <article
              key={a.key}
              className="rounded-2xl bg-white border border-navy-100 p-6 flex flex-col"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-burgundy-700/10 text-burgundy-700">
                <Icon size={20} />
              </div>
              <div className="mt-5 text-xs font-bold tracking-[0.2em] uppercase text-burgundy-700">
                {a.key}
              </div>
              <h3 className="mt-1 text-lg font-black text-navy-900">{a.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-navy-800/75">
                {a.body}
              </p>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
