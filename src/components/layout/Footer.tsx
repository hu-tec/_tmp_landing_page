import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-100/70">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white text-navy-900 text-xs font-black">
              T
            </span>
            <span className="text-white font-black tracking-tight">
              TIMES · AI 영어교사 양성
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed">
            2004년부터 이어온 TESOL 브랜드 위에, AI 프롬프트와 AI 윤리 교육을 결합한
            초등 방과후 영어교사 양성 프로그램입니다.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">바로가기</h4>
          <ul className="space-y-2 text-sm">
            <li><a className="hover:text-white" href="#definition">사업 정의</a></li>
            <li><a className="hover:text-white" href="#program">과정 구성</a></li>
            <li><a className="hover:text-white" href="#revenue">수익 구조</a></li>
            <li><a className="hover:text-white" href="#recruitment">모집 계획</a></li>
            <li><Link className="hover:text-white" href="/community">커뮤니티</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">문의</h4>
          <p className="text-sm">강사양성 · 학교 파견 · 제휴 문의를 받습니다.</p>
          <a
            href="#contact"
            className="mt-4 inline-flex items-center rounded-full bg-burgundy-700 px-5 py-2 text-sm text-white font-semibold hover:bg-burgundy-800"
          >
            문의하기
          </a>
          <p className="mt-6 text-xs text-navy-200/50">
            본 페이지는 시범 랜딩페이지 프로토타입입니다. 수치·일정은 기획안 기준입니다.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-navy-200/50">
        © {new Date().getFullYear()} TIMES. Sample landing for AI afterschool English teacher program.
      </div>
    </footer>
  );
}
