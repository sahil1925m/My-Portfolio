import ScrollSection from "@/components/ScrollSection";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="relative w-full">
      {/* SCROLL SEQUENCE WRAPPER */}
      <ScrollSection />

      {/* PROJECTS */}
      <Projects />
    </main>
  );
}
