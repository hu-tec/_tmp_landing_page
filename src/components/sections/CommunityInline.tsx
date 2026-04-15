"use client";
import { Section } from "@/components/ui/Section";
import { CommunityExplorer } from "@/components/community/CommunityExplorer";
import { usePlan } from "@/components/plan/PlanContext";
import { LayoutGrid } from "lucide-react";

export function CommunityInline() {
  const { plan, mounted } = usePlan();
  if (!mounted || plan !== "1안") return null;

  return (
    <Section
      id="community"
      eyebrow="커뮤니티 · 1안 전용"
      title={
        <>
          랜딩 페이지 안에서<br className="hidden md:block" /> AI 윤리 커뮤니티를 즉시 시연
        </>
      }
      description="1안이 선택된 경우, 랜딩 하단에 공지·FAQ·Q&A·후기 4개 탭과 AI 윤리 6개 카테고리가 그대로 동작합니다. 별도 페이지 이동 없이 첫 시연에서 커뮤니티 UX까지 바로 보여줄 수 있습니다."
      className="bg-parchment"
    >
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-burgundy-200 bg-white px-3 py-1.5 text-[11px] font-bold tracking-[0.2em] uppercase text-burgundy-700">
        <LayoutGrid size={13} /> Landing + Community
      </div>
      <div className="rounded-3xl bg-white border border-navy-100 p-5 md:p-8">
        <CommunityExplorer />
      </div>
    </Section>
  );
}
