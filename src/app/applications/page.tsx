import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ApplicationsTabs } from "@/components/community/ApplicationsTabs";

export const metadata = {
  title: "신청서 | AI 방과후 영어교사 양성과정",
  description:
    "강사 · 전문가 · 번역가 3종 출력형 신청서를 탭으로 즉시 시연합니다.",
};

export default function ApplicationsPage() {
  return (
    <>
      <Header />
      <main className="pt-36 md:pt-44 pb-20 bg-parchment min-h-screen">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800/70 hover:text-burgundy-700"
          >
            <ArrowLeft size={16} /> 랜딩페이지로 돌아가기
          </Link>
          <div className="mt-6 max-w-3xl">
            <div className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-burgundy-700">
              Applications
            </div>
            <h1 className="mt-2 text-3xl md:text-5xl font-black leading-tight text-navy-900">
              신청서 · 강사 / 전문가 / 번역가
            </h1>
            <p className="mt-4 text-base md:text-lg text-navy-800/75 leading-relaxed">
              방과후 영어교사 양성과정과 확장 라인업(AI 윤리 전문가 · 번역가)을 위한
              출력형 신청서를 한 화면에서 탭으로 전환해 시연합니다. 각 신청서는
              독립적으로 빌드된 SPA로, 새 창에서도 그대로 열어볼 수 있습니다.
            </p>
          </div>

          <div className="mt-10 rounded-3xl bg-white border border-navy-100 p-4 md:p-6">
            <ApplicationsTabs />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
