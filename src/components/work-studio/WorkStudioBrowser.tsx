"use client";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { WorkStudioForm } from "./WorkStudioForm";
import {
  CATALOG,
  SITE_META,
  SITE_ORDER,
  formsBySite,
  roleKoreanOf,
} from "./catalog";

export function WorkStudioBrowser() {
  const [site, setSite] = useState<string>("ai_ethics");
  const [formId, setFormId] = useState<string>("expert_apply");

  const forms = useMemo(() => formsBySite(site), [site]);

  const pickSite = (s: string) => {
    setSite(s);
    const first = CATALOG.find((c) => c.site === s);
    if (first) setFormId(first.formId);
  };

  const totalBySite = useMemo(() => {
    const map: Record<string, number> = {};
    for (const c of CATALOG) map[c.site] = (map[c.site] ?? 0) + 1;
    return map;
  }, []);

  return (
    <div>
      <div className="rounded-2xl border border-navy-200 bg-white p-4 md:p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-navy-700">
            사이트 · Site ({SITE_ORDER.length})
          </div>
          <div className="text-[11px] text-navy-500">
            총 {CATALOG.length}개 모듈
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {SITE_ORDER.map((s) => {
            const meta = SITE_META[s];
            const sel = site === s;
            return (
              <button
                key={s}
                onClick={() => pickSite(s)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-colors",
                  sel
                    ? "bg-navy-900 text-white border-navy-900"
                    : "bg-white text-navy-800 border-navy-200 hover:border-navy-400"
                )}
              >
                <span className="text-lg leading-none">{meta.icon}</span>
                <span>{meta.name}</span>
                <code className="text-[10px] opacity-60">{meta.id}</code>
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                    sel
                      ? "bg-emerald-400 text-emerald-950"
                      : "bg-emerald-100 text-emerald-700"
                  )}
                >
                  {totalBySite[s] ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-navy-700">
            모듈 · Form ({forms.length})
          </div>
          <div className="text-[11px] text-navy-500">
            {SITE_META[site].name} 기준
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {forms.map((f) => {
            const sel = formId === f.formId;
            const isApply = f.formId.endsWith("_apply");
            return (
              <button
                key={f.formId}
                onClick={() => setFormId(f.formId)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                  sel
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-white text-navy-800 border-navy-200 hover:border-navy-400"
                )}
              >
                <span>{roleKoreanOf(f.formId)}</span>
                <code
                  className={cn(
                    "text-[10px] rounded px-1 py-0.5",
                    sel ? "bg-emerald-700/40" : "bg-navy-50 text-navy-600"
                  )}
                >
                  {f.formId}
                </code>
                {isApply && (
                  <span
                    className={cn(
                      "rounded-full px-1.5 text-[9px] font-black",
                      sel ? "bg-amber-300 text-amber-950" : "bg-amber-100 text-amber-700"
                    )}
                  >
                    apply
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <WorkStudioForm key={`${site}/${formId}`} site={site} formId={formId} />
      </div>
    </div>
  );
}
