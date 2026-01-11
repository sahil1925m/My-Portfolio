import ScrollSection from "@/components/ScrollSection";
import Projects from "@/components/Projects";
import AboutBento from "@/components/AboutBento";
import TechMarquee from "@/components/TechMarquee";
import MegaFooter from "@/components/MegaFooter";

export default function Home() {
  return (
    <main className="relative w-full">
      {/* SCROLL SEQUENCE WRAPPER */}
      <ScrollSection />

      {/* PROJECTS */}
      <Projects />

      {/* TECH MARQUEE */}
      <TechMarquee />

      {/* ABOUT BENTO GRID */}
      <AboutBento />

      {/* MEGA FOOTER */}
      <MegaFooter />
    </main>
  );
}
