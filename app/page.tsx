import { AboutSection } from "@/components/about";
import { ExperienceSection } from "@/components/experience";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <AboutSection />
      <ExperienceSection />
    </main>
  );
}
