import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CommunityExplorer } from "@/components/community/CommunityExplorer";

export const metadata = {
  title: "커뮤니티 | AI 방과후 영어교사 양성과정",
  description: "공지사항 · FAQ · Q&A · 후기 — AI 윤리 카테고리 기반 커뮤니티 샘플",
};

export default function CommunityPage() {
  return (
    <>
      <Header />
      <main className="pt-24 md:pt-32 pb-24 bg-parchment min-h-screen">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800/70 hover:text-burgundy-700"
          >
            <ArrowLeft size={16} /> 랜딩페이지로 돌아가기
          </Link>
          <div className="mt-6 max-w-2xl">
            <div className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-burgundy-700">
              Community
            </div>
            <h1 className="mt-2 text-3xl md:text-5xl font-black leading-tight text-navy-900">
              커뮤니티 · FAQ · Q&A
            </h1>
            <p className="mt-4 text-base md:text-lg text-navy-800/75 leading-relaxed">
              AI 윤리 페이지용 커뮤니티 구조입니다. 공지사항 / FAQ / Q&A / 후기
              4개 탭과 6개 카테고리 필터가 실제로 동작합니다. FAQ는 실데이터,
              나머지는 샘플 카드 형태로 구성되어 있습니다.
            </p>
          </div>

          <div className="mt-10 rounded-3xl bg-white border border-navy-100 p-5 md:p-8">
            <CommunityExplorer />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
