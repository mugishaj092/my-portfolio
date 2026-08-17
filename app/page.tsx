import { AboutSection } from "@/components/about";
import { ExperienceSection } from "@/components/experience";
import { Hero } from "@/components/hero";
import { ProjectsSection } from "@/components/projects";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
    </main>
  );
}
