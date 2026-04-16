"use client";
import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Info,
  Loader2,
  SendHorizonal,
  Trash2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const COHORTS = [
  "5월 1기 (20명)",
  "6월 2기 (20명)",
  "8월 방학 특강 (100명)",
  "상관 없음",
] as const;

const REGIONS = [
  "연세대",
  "신한대",
  "평택대",
  "부산",
  "대구",
  "강원",
  "온라인",
] as const;

const TESOL_OPTIONS = ["보유", "미보유", "진행 중"] as const;

const EXPERIENCE_OPTIONS = [
  "1년 미만",
  "1~3년",
  "3~5년",
  "5~10년",
  "10년 이상",
] as const;

const AI_LEVEL_OPTIONS = [
  "없음",
  "기초 (ChatGPT 사용)",
  "중급 (프롬프트 설계)",
  "고급 (자동화/개발)",
] as const;

const STORAGE_KEY = "landing-recruit-submissions";

interface FormState {
  name: string;
  phone: string;
  email: string;
  cohorts: string[];
  regions: string[];
  tesol: string;
  tesolYear: string;
  experience: string;
  aiLevel: string;
  motivation: string;
  privacyConsent: boolean;
  marketingConsent: boolean;
}

const INITIAL: FormState = {
  name: "",
  phone: "",
  email: "",
  cohorts: [],
  regions: [],
  tesol: "",
  tesolYear: "",
  experience: "",
  aiLevel: "",
  motivation: "",
  privacyConsent: false,
  marketingConsent: false,
};

export function RecruitApplyForm() {
  const [data, setData] = useState<FormState>(INITIAL);
  const [state, setState] = useState<"idle" | "submitting" | "ok">("idle");
  const [savedId, setSavedId] = useState<string | null>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const togglePill = (key: "cohorts" | "regions", value: string) =>
    setData((prev) => {
      const arr = prev[key];
      return {
        ...prev,
        [key]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });

  const missing = useMemo(() => {
    const m: string[] = [];
    if (!data.name.trim()) m.push("성명");
    if (!data.phone.trim()) m.push("연락처");
    if (!data.email.trim()) m.push("이메일");
    if (data.cohorts.length === 0) m.push("희망 기수");
    if (data.regions.length === 0) m.push("희망 강의장");
    if (!data.tesol) m.push("TESOL 이수");
    if (!data.experience) m.push("강의 경력");
    if (!data.aiLevel) m.push("AI 활용 경험");
    if (!data.privacyConsent) m.push("개인정보 수집·이용 동의");
    return m;
  }, [data]);

  const fillDummy = () => {
    setData({
      name: "김민수",
      phone: "010-1234-5678",
      email: "sample@example.com",
      cohorts: ["5월 1기 (20명)"],
      regions: ["연세대", "온라인"],
      tesol: "보유",
      tesolYear: "2018",
      experience: "3~5년",
      aiLevel: "중급 (프롬프트 설계)",
      motivation:
        "TESOL 기반 수업에 AI 프롬프트·윤리를 얹은 방과후 영어 커리큘럼으로 초등 현장에 기여하고 싶습니다.",
      privacyConsent: true,
      marketingConsent: false,
    });
  };

  const reset = () => {
    setData(INITIAL);
    setState("idle");
    setSavedId(null);
  };

  const submit = async () => {
    if (missing.length > 0) return;
    setState("submitting");
    const id = `R${Date.now().toString(36).toUpperCase()}`;
    const payload = {
      id,
      kind: "recruit_apply",
      site: "afterschool_ai_english",
      submittedAt: new Date().toISOString(),
      data,
    };
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      arr.push(payload);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    } catch {
      /* ignore storage errors */
    }
    await new Promise((r) => setTimeout(r, 600));
    setSavedId(id);
    setState("ok");
  };

  if (state === "ok" && savedId) {
    return <SuccessView id={savedId} data={data} onReset={reset} />;
  }

  return (
    <div>
      <div className="rounded-2xl border border-burgundy-200 bg-burgundy-50/60 p-4 md:p-5 flex flex-wrap items-start gap-4">
        <div className="flex-1 min-w-[260px]">
          <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-burgundy-700">
            <Sparkles size={13} /> AI 방과후 영어교사 양성과정
          </div>
          <h3 className="mt-1 text-lg md:text-2xl font-black text-navy-900">
            모집 신청 · 기수 · 지역 · 이수 여부
          </h3>
          <p className="mt-1 text-xs md:text-sm text-navy-800/75 leading-relaxed">
            5월 20명 · 6월 20명 · 8월 100명 → 9월 초등 방과후 파견. TESOL 졸업생 30% 할인 적용 가능.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fillDummy}
            className="inline-flex items-center gap-1.5 rounded-full border border-burgundy-300 bg-white px-3 py-1.5 text-xs font-semibold text-burgundy-700 hover:bg-burgundy-50"
          >
            예시 채우기
          </button>
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-full border border-navy-200 bg-white px-3 py-1.5 text-xs font-semibold text-navy-800 hover:border-navy-400"
          >
            <Trash2 size={12} /> 초기화
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <TextField
          label="성명"
          required
          value={data.name}
          onChange={(v) => set("name", v)}
          placeholder="예: 홍길동"
        />
        <TextField
          label="연락처"
          required
          type="tel"
          value={data.phone}
          onChange={(v) => set("phone", v)}
          placeholder="010-0000-0000"
        />
        <TextField
          label="이메일"
          required
          type="email"
          value={data.email}
          onChange={(v) => set("email", v)}
          placeholder="example@domain.com"
          span2
        />

        <PillField
          label="희망 기수"
          required
          options={[...COHORTS]}
          values={data.cohorts}
          onToggle={(v) => togglePill("cohorts", v)}
          span2
        />
        <PillField
          label="희망 강의장"
          required
          options={[...REGIONS]}
          values={data.regions}
          onToggle={(v) => togglePill("regions", v)}
          span2
        />

        <RadioField
          label="TESOL 이수"
          required
          options={[...TESOL_OPTIONS]}
          value={data.tesol}
          onChange={(v) => set("tesol", v)}
        />
        <TextField
          label="TESOL 수료 연도"
          value={data.tesolYear}
          onChange={(v) => set("tesolYear", v)}
          placeholder="예: 2018 (보유 시에만)"
        />

        <RadioField
          label="강의 경력"
          required
          options={[...EXPERIENCE_OPTIONS]}
          value={data.experience}
          onChange={(v) => set("experience", v)}
          span2
        />

        <RadioField
          label="AI 활용 경험"
          required
          options={[...AI_LEVEL_OPTIONS]}
          value={data.aiLevel}
          onChange={(v) => set("aiLevel", v)}
          span2
        />

        <div className="md:col-span-2">
          <label className="text-xs font-bold text-navy-800">
            지원 동기 (선택)
          </label>
          <textarea
            value={data.motivation}
            onChange={(e) => set("motivation", e.target.value)}
            rows={4}
            className="mt-1.5 w-full rounded-xl border border-navy-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-navy-500"
            placeholder="교수법 배경, AI 활용 경험, 지원 동기 등을 자유롭게 적어주세요."
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-2 rounded-xl border border-navy-100 bg-navy-50/50 p-4">
          <label className="flex items-start gap-2 text-sm text-navy-900">
            <input
              type="checkbox"
              checked={data.privacyConsent}
              onChange={(e) => set("privacyConsent", e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-navy-300 text-burgundy-700 focus:ring-burgundy-500"
            />
            <span>
              <b className="text-burgundy-700">[필수]</b> 개인정보 수집·이용 동의 — 지원자 식별
              및 모집 안내 목적으로 성명·연락처·이메일을 수집·이용하며, 신청 완료 후 3년간 보관합니다.
            </span>
          </label>
          <label className="flex items-start gap-2 text-sm text-navy-900">
            <input
              type="checkbox"
              checked={data.marketingConsent}
              onChange={(e) => set("marketingConsent", e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-navy-300 text-burgundy-700 focus:ring-burgundy-500"
            />
            <span>
              <span className="text-navy-500 font-semibold">[선택]</span> 향후 커리큘럼 개설 · 할인 혜택 등 마케팅 정보 수신 동의
            </span>
          </label>
        </div>
      </div>

      <SubmitBar
        missing={missing}
        state={state}
        onSubmit={submit}
      />
    </div>
  );
}

function SuccessView({
  id,
  data,
  onReset,
}: {
  id: string;
  data: FormState;
  onReset: () => void;
}) {
  return (
    <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-8 md:p-10">
      <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] uppercase text-emerald-700 border border-emerald-200">
        <CheckCircle2 size={13} /> 접수 완료
      </div>
      <h3 className="mt-5 text-2xl md:text-3xl font-black text-navy-900">
        모집 신청이 정상적으로 접수되었습니다.
      </h3>
      <p className="mt-3 text-base text-navy-800/80 leading-relaxed max-w-2xl">
        신청 번호 <code className="rounded bg-white px-2 py-0.5 border border-emerald-200 font-black">{id}</code> — 담당자가 확인 후 입력하신 이메일(<b>{data.email}</b>) 및 연락처(<b>{data.phone}</b>)로 기수별 오리엔테이션 일정을 안내드립니다.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 text-sm">
        <SummaryRow label="성명" value={data.name} />
        <SummaryRow label="희망 기수" value={data.cohorts.join(" · ")} />
        <SummaryRow label="희망 강의장" value={data.regions.join(" · ")} />
        <SummaryRow label="TESOL" value={data.tesol + (data.tesolYear ? ` (${data.tesolYear})` : "")} />
        <SummaryRow label="강의 경력" value={data.experience} />
        <SummaryRow label="AI 활용" value={data.aiLevel} />
      </div>
      <p className="mt-6 text-[11px] text-navy-700/70">
        * 본 프로토타입은 신청서를 브라우저 로컬 스토리지에 저장합니다 (키: <code>landing-recruit-submissions</code>). 실제 운영 시 Work Studio DB / 이메일 알림으로 연동됩니다.
      </p>
      <div className="mt-6 flex gap-2">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1.5 rounded-full bg-navy-900 text-white px-5 py-2.5 text-sm font-bold hover:bg-navy-800"
        >
          새 신청서 작성
        </button>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 rounded-lg border border-emerald-100 bg-white px-4 py-2.5">
      <span className="text-xs font-bold tracking-[0.2em] uppercase text-emerald-700">
        {label}
      </span>
      <span className="font-semibold text-navy-900 text-right">
        {value || "—"}
      </span>
    </div>
  );
}

function TextField({
  label,
  required,
  value,
  onChange,
  placeholder,
  type = "text",
  span2,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: "text" | "tel" | "email";
  span2?: boolean;
}) {
  return (
    <div className={span2 ? "md:col-span-2" : undefined}>
      <label className="text-xs font-bold text-navy-800">
        {label}
        {required && <span className="text-burgundy-700 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-navy-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-navy-500"
      />
    </div>
  );
}

function PillField({
  label,
  required,
  options,
  values,
  onToggle,
  span2,
}: {
  label: string;
  required?: boolean;
  options: string[];
  values: string[];
  onToggle: (v: string) => void;
  span2?: boolean;
}) {
  return (
    <div className={span2 ? "md:col-span-2" : undefined}>
      <label className="text-xs font-bold text-navy-800">
        {label}
        {required && <span className="text-burgundy-700 ml-1">*</span>}
      </label>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const on = values.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onToggle(opt)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                on
                  ? "bg-burgundy-700 text-white border-burgundy-700"
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

function RadioField({
  label,
  required,
  options,
  value,
  onChange,
  span2,
}: {
  label: string;
  required?: boolean;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  span2?: boolean;
}) {
  return (
    <div className={span2 ? "md:col-span-2" : undefined}>
      <label className="text-xs font-bold text-navy-800">
        {label}
        {required && <span className="text-burgundy-700 ml-1">*</span>}
      </label>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const on = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={cn(
                "rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors",
                on
                  ? "bg-navy-900 text-white border-navy-900"
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

function SubmitBar({
  missing,
  state,
  onSubmit,
}: {
  missing: string[];
  state: "idle" | "submitting" | "ok";
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
          disabled={missing.length > 0 || state === "submitting"}
          className="inline-flex items-center gap-2 rounded-full bg-burgundy-700 text-white px-6 py-3 text-sm font-bold hover:bg-burgundy-800 disabled:opacity-50 shadow-lg shadow-burgundy-900/20"
        >
          {state === "submitting" ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <SendHorizonal size={14} />
          )}
          모집 신청 제출
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
    </div>
  );
}
