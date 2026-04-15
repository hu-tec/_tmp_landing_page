"use client";
import { useMemo, useState } from "react";
import { FAQ } from "@/data/faq";
import { NOTICES, QNA, REVIEWS } from "@/data/community";
import {
  COMMUNITY_TABS,
  FAQ_CATEGORIES,
  type CommunityTab,
  type FaqCategory,
} from "@/types/community";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const FILTERABLE: CommunityTab[] = ["FAQ"];

export function CommunityExplorer() {
  const [tab, setTab] = useState<CommunityTab>("FAQ");
  const [cat, setCat] = useState<FaqCategory | "전체">("전체");
  const [open, setOpen] = useState<string | null>(null);

  const faqFiltered = useMemo(() => {
    if (cat === "전체") return FAQ;
    return FAQ.filter((f) => f.category === cat);
  }, [cat]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-navy-100">
        {COMMUNITY_TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-5 py-3 text-sm md:text-base font-bold border-b-2 -mb-px transition-colors",
              tab === t
                ? "border-burgundy-700 text-burgundy-700"
                : "border-transparent text-navy-800/60 hover:text-navy-900"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {FILTERABLE.includes(tab) && (
        <div className="mt-6 flex flex-wrap gap-2">
          {(["전체", ...FAQ_CATEGORIES] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs md:text-sm font-semibold transition-colors",
                cat === c
                  ? "bg-navy-900 text-white border-navy-900"
                  : "bg-white text-navy-800 border-navy-200 hover:border-navy-400"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="mt-8">
        {tab === "FAQ" && (
          <ul className="grid gap-3">
            {faqFiltered.map((f) => {
              const isOpen = open === f.id;
              return (
                <li
                  key={f.id}
                  className={cn(
                    "rounded-2xl border bg-white transition-all",
                    isOpen
                      ? "border-navy-300 shadow-md"
                      : "border-navy-100 hover:border-navy-200"
                  )}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : f.id)}
                    className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left"
                  >
                    <div>
                      <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-burgundy-700">
                        {f.category}
                      </div>
                      <div className="mt-1 text-base md:text-lg font-bold text-navy-900">
                        {f.question}
                      </div>
                    </div>
                    <ChevronDown
                      size={20}
                      className={cn(
                        "mt-1 shrink-0 text-navy-700 transition-transform",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm md:text-base text-navy-800/80 leading-relaxed">
                      {f.answer}
                    </div>
                  )}
                </li>
              );
            })}
            {faqFiltered.length === 0 && (
              <li className="rounded-2xl border border-dashed border-navy-200 p-8 text-center text-sm text-navy-800/60">
                해당 카테고리에 등록된 질문이 없습니다.
              </li>
            )}
          </ul>
        )}

        {tab === "공지사항" && <CardList items={NOTICES} emptyLabel="등록된 공지가 없습니다." />}
        {tab === "Q&A" && <CardList items={QNA} emptyLabel="등록된 질문이 없습니다." />}
        {tab === "후기" && <CardList items={REVIEWS} emptyLabel="등록된 후기가 없습니다." />}
      </div>
    </div>
  );
}

function CardList({
  items,
  emptyLabel,
}: {
  items: { id: string; title: string; summary?: string; date?: string; author?: string; category?: FaqCategory }[];
  emptyLabel: string;
}) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-navy-200 p-8 text-center text-sm text-navy-800/60">
        {emptyLabel}
      </div>
    );
  }
  return (
    <ul className="grid gap-3">
      {items.map((it) => (
        <li
          key={it.id}
          className="rounded-2xl border border-navy-100 bg-white p-5 hover:border-navy-300 transition-colors"
        >
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-burgundy-700">
            {it.category && <span>{it.category}</span>}
            {it.date && <span className="text-navy-400">· {it.date}</span>}
            {it.author && <span className="text-navy-400">· {it.author}</span>}
          </div>
          <h3 className="mt-1.5 text-base md:text-lg font-bold text-navy-900">
            {it.title}
          </h3>
          {it.summary && (
            <p className="mt-1 text-sm text-navy-800/75 leading-relaxed">
              {it.summary}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}
