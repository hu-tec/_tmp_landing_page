import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Megaphone,
  Wallet,
  Rocket,
} from "lucide-react";

type Winner = "1" | "2" | "both";

interface Row {
  label: string;
  Icon: typeof Sparkles;
  plan1: string;
  plan2: string;
  winner: Winner;
}

const ROWS: Row[] = [
  {
    label: "구성 범위",
    Icon: Sparkles,
    plan1: "랜딩 + 커뮤니티 동시 포함",
    plan2: "랜딩 본체 우선, 커뮤니티는 후속",
    winner: "both",
  },
  {
    label: "첫 시연 완결성",
    Icon: CheckCircle2,
    plan1: "공지·FAQ·Q&A·후기까지 풀셋 시연",
    plan2: "핵심 메시지 + 프로그램 구조 중심",
    winner: "1",
  },
  {
    label: "시연 준비 속도",
    Icon: Clock,
    plan1: "커뮤니티 카테고리·데이터 선확정 필요",
    plan2: "현재 상태로 즉시 시연 가능",
    winner: "2",
  },
  {
    label: "운영 리스크",
    Icon: ShieldAlert,
    plan1: "커뮤니티 운영 주체·정책 조기 결정 부담",
    plan2: "커뮤니티 UX 2차 재작업 가능성",
    winner: "2",
  },
  {
    label: "대표 설득력",
    Icon: Megaphone,
    plan1: "완결성 있는 풀 데모로 임팩트 강함",
    plan2: "핵심 메시지·수익 구조에 집중 가능",
    winner: "1",
  },
  {
    label: "투자 효율",
    Icon: Wallet,
    plan1: "초기 작업량 높음, 1회 완성",
    plan2: "단계적 투자로 위험 분산",
    winner: "2",
  },
  {
    label: "권장 사용 시점",
    Icon: Rocket,
    plan1: "커뮤니티 스펙 확정된 최종 보고",
    plan2: "당일 즉시 대표 시연 · 1차 설득",
    winner: "both",
  },
];

const cellTone = (winner: Winner, col: "1" | "2") => {
  if (winner === col) {
    return "bg-burgundy-50 text-navy-900 font-semibold";
  }
  if (winner === "both") {
    return "bg-navy-50/60 text-navy-900 font-medium";
  }
  return "text-navy-800/75";
};

export function PlanCompare() {
  return (
    <Section
      id="plan-compare"
      eyebrow="1안 vs 2안 요약"
      title="대표 보고용 · 한눈에 보는 비교"
      description="상단 토글로 1안 / 2안 데모를 번갈아 체험한 뒤, 아래 표로 최종 선택 근거를 함께 확인해 주세요. 짙게 표시된 셀이 해당 항목에서 더 유리한 쪽입니다."
    >
      <div className="overflow-hidden rounded-2xl border border-navy-100 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm md:text-base min-w-[640px]">
            <thead className="bg-navy-900 text-white">
              <tr>
                <th className="text-left px-4 py-3 font-bold w-[28%]">항목</th>
                <th className="text-left px-4 py-3 font-bold">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-burgundy-700 text-[10px] font-black">1</span>
                    랜딩 + 커뮤니티
                  </span>
                </th>
                <th className="text-left px-4 py-3 font-bold">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-burgundy-700 text-[10px] font-black">2</span>
                    랜딩 우선
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100 bg-white">
              {ROWS.map(({ label, Icon, plan1, plan2, winner }) => (
                <tr key={label} className="align-top">
                  <td className="px-4 py-4 font-bold text-navy-900 border-r border-navy-100">
                    <span className="inline-flex items-center gap-2">
                      <Icon size={16} className="text-burgundy-700" />
                      {label}
                    </span>
                  </td>
                  <td className={cn("px-4 py-4 border-r border-navy-100", cellTone(winner, "1"))}>
                    {plan1}
                  </td>
                  <td className={cn("px-4 py-4", cellTone(winner, "2"))}>
                    {plan2}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-[1fr_auto] items-start rounded-2xl border border-burgundy-200 bg-burgundy-50/60 p-5 md:p-7">
        <div>
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-burgundy-700">
            추천 시나리오
          </div>
          <p className="mt-2 text-lg md:text-2xl font-black text-navy-900 leading-snug text-balance">
            1차 대표 시연은 2안 → 커뮤니티 스펙 확정 이후 1안으로 전환
          </p>
          <p className="mt-3 text-sm md:text-base text-navy-800/80 leading-relaxed max-w-2xl">
            랜딩 본체로 메시지·수익 구조를 먼저 확정해 리스크를 줄이고,
            AI 윤리 커뮤니티 카테고리·운영 정책이 정해지는 시점에 1안으로
            업그레이드하는 경로가 가장 효율이 좋습니다. 상단 토글로 두 안을
            즉시 비교 시연 가능합니다.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-xs font-semibold">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white text-burgundy-700 border border-burgundy-200 px-3 py-1.5">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-burgundy-700 text-white text-[9px] font-black">2</span>
            1차 시연 권장
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white text-burgundy-700 border border-burgundy-200 px-3 py-1.5">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-burgundy-700 text-white text-[9px] font-black">1</span>
            최종 보고 권장
          </span>
        </div>
      </div>
    </Section>
  );
}
