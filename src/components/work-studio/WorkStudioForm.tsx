"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Info,
  Loader2,
  RefreshCw,
  SendHorizonal,
  Sparkles,
  Trash2,
  Wand2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  fetchFormConfig,
  getApplication,
  submitApplication,
  WORK_STUDIO_API_BASE,
  type ApplicationRecord,
  type FormConfig,
  type FormField,
  type FormSection,
} from "./api";

type Phase = "part1" | "part2";
const PHASES: Phase[] = ["part1", "part2"];

function dummyValue(field: FormField): unknown {
  switch (field.type) {
    case "text":
      return field.key === "name" ? "랜딩 테스트 더미" : "샘플 입력";
    case "tel":
      return "010-1234-5678";
    case "email":
      return "landing-test@example.com";
    case "textarea":
      return field.key === "introduction"
        ? "AI 윤리 전문가 풀 등록 테스트용 자동 더미 자기소개. 랜딩 프로토타입에서 Work Studio API 연동 검증을 위해 생성되었습니다."
        : "포트폴리오 · 강의 영상 링크 샘플";
    case "checkbox":
      return true;
    case "multiselect":
      return field.options && field.options.length > 0 ? [field.options[0]] : [];
    default:
      return undefined;
  }
}

function missingRequired(field: FormField, value: unknown): boolean {
  if (!field.required) return false;
  if (field.type === "multiselect")
    return !Array.isArray(value) || value.length === 0;
  if (field.type === "checkbox") return value !== true;
  return !value || String(value).trim() === "";
}

export function WorkStudioForm() {
  const [configs, setConfigs] = useState<{
    part1: FormConfig | null;
    part2: FormConfig | null;
  }>({ part1: null, part2: null });
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [phase, setPhase] = useState<Phase>("part1");
  const [data, setData] = useState<{
    part1: Record<string, unknown>;
    part2: Record<string, unknown>;
  }>({ part1: {}, part2: {} });

  const [submitState, setSubmitState] = useState<
    "idle" | "pending" | "ok" | "err"
  >("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedId, setSubmittedId] = useState<number | null>(null);
  const [roundTrip, setRoundTrip] = useState<ApplicationRecord | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const [p1, p2] = await Promise.all([
        fetchFormConfig("ai_ethics", "expert_apply", "part1"),
        fetchFormConfig("ai_ethics", "expert_apply", "part2"),
      ]);
      setConfigs({ part1: p1, part2: p2 });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setLoadError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const setField = (p: Phase, key: string, value: unknown) => {
    setData((prev) => ({ ...prev, [p]: { ...prev[p], [key]: value } }));
  };

  const fillDummy = () => {
    const next = {
      part1: { ...data.part1 },
      part2: { ...data.part2 },
    };
    for (const p of PHASES) {
      const cfg = configs[p];
      if (!cfg) continue;
      for (const s of cfg.sections) {
        for (const f of s.fields) {
          const v = dummyValue(f);
          if (v !== undefined) next[p][f.key] = v;
        }
      }
    }
    setData(next);
  };

  const resetAll = () => {
    setData({ part1: {}, part2: {} });
    setSubmitState("idle");
    setSubmitError(null);
    setSubmittedId(null);
    setRoundTrip(null);
  };

  const submit = async () => {
    setSubmitState("pending");
    setSubmitError(null);
    setSubmittedId(null);
    setRoundTrip(null);
    try {
      const res = await submitApplication({
        _site: "ai_ethics",
        _formId: "expert_apply",
        _role: "expert",
        _phase: "part1",
        _status: 0,
        _submitted: true,
        _dummy: true,
        _notes: "랜딩 프로토타입 테스트 제출",
        part1: data.part1,
        part2: data.part2,
      });
      setSubmittedId(res.id);
      const echo = await getApplication(res.id);
      setRoundTrip(echo);
      setSubmitState("ok");
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setSubmitError(msg);
      setSubmitState("err");
    }
  };

  const missing = useMemo(() => {
    const arr: string[] = [];
    for (const p of PHASES) {
      const cfg = configs[p];
      if (!cfg) continue;
      for (const s of cfg.sections) {
        for (const f of s.fields) {
          if (missingRequired(f, data[p][f.key]))
            arr.push(`${s.name} · ${f.label}`);
        }
      }
    }
    return arr;
  }, [configs, data]);

  if (loading) {
    return (
      <div className="py-16 text-center text-sm text-navy-700">
        <Loader2 className="inline mr-2 animate-spin" size={16} />
        Work Studio API에서 설정 불러오는 중…
      </div>
    );
  }

  if (loadError || !configs.part1 || !configs.part2) {
    return <ApiErrorPanel err={loadError} onRetry={load} />;
  }

  const active = configs[phase]!;
  const headerCfg = configs.part1;

  return (
    <div>
      {/* Meta / Work Studio banner */}
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 md:p-5 flex flex-wrap items-start gap-4">
        <div className="flex-1 min-w-[260px]">
          <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-emerald-700">
            <Sparkles size={13} /> Work Studio 실시간 연동
          </div>
          <h3 className="mt-1 text-lg md:text-xl font-black text-navy-900">
            {headerCfg.siteInfo.icon} {headerCfg.displayName}
          </h3>
          <div className="mt-1.5 text-xs md:text-sm text-navy-800/75 flex flex-wrap gap-x-3 gap-y-1">
            <span>{headerCfg.siteInfo.name}</span>
            <span>
              formId{" "}
              <code className="rounded bg-white px-1.5 py-0.5 border border-emerald-200">
                {headerCfg.formId}
              </code>
            </span>
            <span>
              version <b>v{headerCfg.version}</b>
            </span>
            <span>
              API{" "}
              <code className="rounded bg-white px-1.5 py-0.5 border border-emerald-200">
                {WORK_STUDIO_API_BASE}
              </code>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <a
            href={`${WORK_STUDIO_API_BASE}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-50"
          >
            Work Studio 열기 <ExternalLink size={12} />
          </a>
          <button
            onClick={load}
            className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-50"
          >
            <RefreshCw size={12} /> 설정 새로고침
          </button>
        </div>
      </div>

      {/* Phase tabs + toolbar */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div
          role="tablist"
          aria-label="part 전환"
          className="inline-flex items-center gap-1 rounded-full bg-navy-100 p-1"
        >
          {PHASES.map((p) => {
            const sel = phase === p;
            const cfg = configs[p];
            return (
              <button
                key={p}
                role="tab"
                aria-selected={sel}
                onClick={() => setPhase(p)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-bold transition-colors",
                  sel
                    ? "bg-navy-900 text-white"
                    : "text-navy-800 hover:bg-white"
                )}
              >
                {p.toUpperCase()} · {cfg?.sections.length}섹션
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fillDummy}
            className="inline-flex items-center gap-1.5 rounded-full border border-navy-200 bg-white px-3 py-1.5 text-xs font-semibold text-navy-800 hover:border-navy-400"
          >
            <Wand2 size={13} /> 더미 데이터 채우기
          </button>
          <button
            onClick={resetAll}
            className="inline-flex items-center gap-1.5 rounded-full border border-navy-200 bg-white px-3 py-1.5 text-xs font-semibold text-navy-800 hover:border-navy-400"
          >
            <Trash2 size={13} /> 초기화
          </button>
        </div>
      </div>

      {/* Sections */}
      <div className="mt-6 space-y-5">
        {active.sections.map((section) => (
          <SectionCard
            key={section.moduleId}
            section={section}
            values={data[phase]}
            onChange={(k, v) => setField(phase, k, v)}
          />
        ))}
      </div>

      <SubmitBar
        missing={missing}
        state={submitState}
        error={submitError}
        submittedId={submittedId}
        roundTrip={roundTrip}
        onSubmit={submit}
      />
    </div>
  );
}

function ApiErrorPanel({
  err,
  onRetry,
}: {
  err: string | null;
  onRetry: () => void;
}) {
  const isHttps =
    typeof window !== "undefined" && window.location.protocol === "https:";
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 md:p-6">
      <div className="flex items-start gap-3">
        <AlertTriangle
          className="shrink-0 text-amber-700 mt-0.5"
          size={18}
        />
        <div>
          <h3 className="text-base md:text-lg font-black text-amber-800">
            Work Studio API에 접근할 수 없습니다
          </h3>
          <p className="mt-1 text-sm text-amber-900/80 leading-relaxed">
            {err ?? "원인 불명"}
          </p>
          {isHttps && (
            <p className="mt-3 text-sm text-amber-900/90 leading-relaxed">
              이 페이지는 <b>HTTPS (GitHub Pages)</b>에서 서빙되지만, Work Studio API는{" "}
              <b>HTTP</b>(54.116.15.136)로 제공됩니다. 브라우저의{" "}
              <b>Mixed Content 정책</b> 때문에 배포된 HTTPS 페이지에서는 API
              요청이 차단됩니다. 아래 방법으로 테스트해 주세요.
            </p>
          )}
          <ul className="mt-3 space-y-1.5 text-sm text-amber-900/90 list-disc list-inside">
            <li>
              로컬 개발 서버로 실행:{" "}
              <code className="rounded bg-white px-1.5 py-0.5 border border-amber-200">
                npm run dev
              </code>{" "}
              →{" "}
              <code className="rounded bg-white px-1.5 py-0.5 border border-amber-200">
                http://localhost:3000/applications
              </code>
            </li>
            <li>EC2에 HTTPS 인증서 적용 (도메인 + Let&apos;s Encrypt)</li>
            <li>혹은 Cloudflare Workers / Nginx HTTPS 프록시 경유</li>
          </ul>
          <button
            onClick={onRetry}
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-amber-700 text-white px-4 py-2 text-xs font-bold hover:bg-amber-800"
          >
            <RefreshCw size={13} /> 다시 시도
          </button>
        </div>
      </div>
    </div>
  );
}

function SectionCard({
  section,
  values,
  onChange,
}: {
  section: FormSection;
  values: Record<string, unknown>;
  onChange: (k: string, v: unknown) => void;
}) {
  return (
    <section className="rounded-2xl border border-navy-100 bg-white p-5 md:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-emerald-700">
            {section.roleGroup}/{section.role} · {section.category}
          </div>
          <h4 className="mt-0.5 text-base md:text-lg font-black text-navy-900">
            {section.name}
          </h4>
        </div>
        <span className="text-[11px] text-navy-500 whitespace-nowrap">
          {section.fields.length} fields
        </span>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {section.fields.map((f) => (
          <DynamicField
            key={f.key}
            field={f}
            value={values[f.key]}
            onChange={(v) => onChange(f.key, v)}
          />
        ))}
      </div>
    </section>
  );
}

function DynamicField({
  field,
  value,
  onChange,
}: {
  field: FormField;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const label = (
    <label className="text-xs font-bold text-navy-800 flex items-center gap-1.5">
      {field.label}
      {field.required && <span className="text-burgundy-700">*</span>}
      <span className="rounded bg-navy-50 px-1.5 py-0.5 text-[10px] text-navy-600 border border-navy-100">
        {field.type}
      </span>
    </label>
  );

  if (field.type === "multiselect") {
    const arr: string[] = Array.isArray(value) ? (value as string[]) : [];
    const toggle = (opt: string) => {
      if (arr.includes(opt)) onChange(arr.filter((x) => x !== opt));
      else onChange([...arr, opt]);
    };
    const wide =
      field.options && field.options.length > 6 ? "md:col-span-2" : undefined;
    return (
      <div className={wide}>
        {label}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {field.options?.map((opt) => {
            const on = arr.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() => toggle(opt)}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors",
                  on
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-white text-navy-800 border-navy-200 hover:border-navy-400"
                )}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div className="md:col-span-2">
        {label}
        <textarea
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          rows={3}
          className="mt-1.5 w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm outline-none focus:border-navy-500"
        />
      </div>
    );
  }

  if (field.type === "checkbox") {
    return (
      <div className="md:col-span-2 flex items-start gap-2">
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-navy-300 text-emerald-600 focus:ring-emerald-500"
        />
        <div>{label}</div>
      </div>
    );
  }

  return (
    <div>
      {label}
      <input
        type={
          field.type === "email"
            ? "email"
            : field.type === "tel"
              ? "tel"
              : "text"
        }
        value={(value as string) ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className="mt-1.5 w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm outline-none focus:border-navy-500"
      />
    </div>
  );
}

function SubmitBar({
  missing,
  state,
  error,
  submittedId,
  roundTrip,
  onSubmit,
}: {
  missing: string[];
  state: "idle" | "pending" | "ok" | "err";
  error: string | null;
  submittedId: number | null;
  roundTrip: ApplicationRecord | null;
  onSubmit: () => void;
}) {
  return (
    <div className="mt-8 rounded-2xl border border-navy-100 bg-navy-50/50 p-5 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm">
          {missing.length > 0 ? (
            <span className="text-amber-700 font-semibold">
              <Info size={14} className="inline mr-1" />
              필수 항목 {missing.length}건 누락
            </span>
          ) : (
            <span className="text-emerald-700 font-semibold">
              <CheckCircle2 size={14} className="inline mr-1" />
              필수 항목 준비 완료
            </span>
          )}
        </div>
        <button
          onClick={onSubmit}
          disabled={state === "pending"}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 text-white px-5 py-2.5 text-sm font-bold hover:bg-emerald-700 disabled:opacity-50"
        >
          {state === "pending" ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <SendHorizonal size={14} />
          )}
          Work Studio로 제출 (더미 플래그)
        </button>
      </div>
      {missing.length > 0 && (
        <details className="mt-3 text-xs text-navy-700">
          <summary className="cursor-pointer">누락 항목 펼치기</summary>
          <ul className="mt-2 list-disc list-inside space-y-0.5">
            {missing.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </details>
      )}
      {state === "err" && (
        <div className="mt-3 rounded-lg border border-burgundy-200 bg-burgundy-50 p-3 text-xs text-burgundy-800">
          제출 실패: {error}
        </div>
      )}
      {state === "ok" && submittedId !== null && (
        <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-900 space-y-1.5">
          <div className="font-bold flex items-center gap-1.5">
            <CheckCircle2 size={14} />
            제출 성공 · id={submittedId}
          </div>
          <div>
            Work Studio DB 저장 확인 →{" "}
            <a
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href={`${WORK_STUDIO_API_BASE}/api/applications/${submittedId}`}
            >
              /api/applications/{submittedId}
            </a>
          </div>
          {roundTrip && (
            <pre className="mt-2 rounded bg-white/70 p-2 text-[10px] overflow-x-auto text-navy-900 max-h-48">
              {JSON.stringify(roundTrip, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
