import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { PlanProvider } from "@/components/plan/PlanContext";
import { PlanSwitcher } from "@/components/plan/PlanSwitcher";

const noto = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-noto",
  display: "swap",
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "AI 방과후 영어교사 양성과정 | TIMES",
  description:
    "TESOL 기반 + AI 프롬프트 + AI 윤리 결합. 초등 방과후 영어수업이 가능한 AI 영어교사를 양성합니다.",
  metadataBase: new URL("https://hu-tec.github.io"),
  openGraph: {
    title: "AI 방과후 영어교사 양성과정 | TIMES",
    description:
      "AI를 가르치는 과정이 아니라, AI를 활용해 영어수업을 더 잘하는 교사를 만드는 과정",
    type: "website",
    locale: "ko_KR",
  },
  icons: {
    icon: `${basePath}/favicon.svg`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={noto.variable}>
      <body className="font-sans antialiased">
        <PlanProvider>
          <PlanSwitcher />
          {children}
        </PlanProvider>
      </body>
    </html>
  );
}
