import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { MarqueeBar } from "@/components/sections/MarqueeBar";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SecuritySection } from "@/components/sections/SecuritySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CtaSection } from "@/components/sections/CtaSection";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <MarqueeBar />
        <ProjectsSection />
        <SecuritySection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
