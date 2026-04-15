import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Definition } from "@/components/sections/Definition";
import { WhyThis } from "@/components/sections/WhyThis";
import { Program } from "@/components/sections/Program";
import { KeyMessage } from "@/components/sections/KeyMessage";
import { Revenue } from "@/components/sections/Revenue";
import { Recruitment } from "@/components/sections/Recruitment";
import { Strengths } from "@/components/sections/Strengths";
import { Expansion } from "@/components/sections/Expansion";
import { FaqTeaser } from "@/components/sections/FaqTeaser";
import { CommunityInline } from "@/components/sections/CommunityInline";
import { PlanCompare } from "@/components/sections/PlanCompare";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Definition />
        <WhyThis />
        <Program />
        <KeyMessage />
        <Revenue />
        <Recruitment />
        <Strengths />
        <Expansion />
        <FaqTeaser />
        <CommunityInline />
        <PlanCompare />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
