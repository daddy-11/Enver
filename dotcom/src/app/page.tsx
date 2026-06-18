import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { AiCofounderHero } from "@/components/sections/AiCofounderHero";
import { OperatingModel } from "@/components/sections/OperatingModel";
import { QuestionBank } from "@/components/sections/QuestionBank";
import { InTheNews } from "@/components/sections/InTheNews";
import { DaydreamTestimonials } from "@/components/sections/DaydreamTestimonials";

export const metadata: Metadata = {
  title: "Enver AI Tech — AI Operations & Engineering",
  description: "enver delivers an unfair advantage in technical recruitment and operational emergency dispatch by combining a proven methodology with SEO agents and dedicated experts.",
};

export default function HomePage() {
  return (
    <div className="bg-[#FAF6EF] min-h-screen selection:bg-purple-500/10">
      <Navigation />
      <main>
        <AiCofounderHero />
        <OperatingModel />
        <QuestionBank />
        <InTheNews />
        <DaydreamTestimonials />
      </main>
      <Footer />
    </div>
  );
}
