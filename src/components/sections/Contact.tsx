import { Section } from "@/components/ui/Section";
import { Mail, Phone, MessageSquare } from "lucide-react";

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="문의하기"
      title="기수·파견·제휴 문의"
      description="강사양성 과정 지원, 학교 파견 연계, 언론·기관 제휴 문의를 환영합니다."
      className="bg-navy-950 text-white"
      inverted
    >
      <div className="grid gap-5 md:grid-cols-3">
        {[
          { Icon: MessageSquare, label: "상담 채널", value: "타임스 공식 문의 채널" },
          { Icon: Mail, label: "이메일", value: "landing-demo@times.example" },
          { Icon: Phone, label: "전화", value: "시범 랜딩페이지 — 데모 데이터" },
        ].map(({ Icon, label, value }) => (
          <div
            key={label}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
          >
            <Icon size={22} className="text-burgundy-300" />
            <div className="mt-4 text-xs font-bold tracking-[0.2em] uppercase text-burgundy-300">
              {label}
            </div>
            <div className="mt-1 text-lg font-black text-white">{value}</div>
          </div>
        ))}
      </div>
      <p className="mt-8 text-xs text-navy-100/50">
        * 본 페이지는 실제 운영 사이트 전 단계의 시범 랜딩페이지 프로토타입입니다.
        수치·일정·자격증 정보는 기획안 기준으로 조정될 수 있습니다.
      </p>
    </Section>
  );
}
